"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { getData } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import { NoteData } from "@/types/NoteData";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import NotFoundError from "@/app/not-found";
import Loader from "@/components/ui/Loader";

import { FlashcardArray } from "react-quizlet-flashcard";
import Back from "@/components/ui/Back";
import { FlashCard } from "@/types/FlashCards";
import Markdown from "react-markdown";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import Gemini from "@/components/ui/Gemini";

export default function Flashcards({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = useAuth();
  const router = useRouter();
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [note, setNote] = useState<DocumentData | null>(null);
  const [cards, setCards] = useState<
    { id: number; frontHTML: ReactElement; backHTML: ReactElement }[] | null
  >(null);
  const controlRef = useRef<any>({});

  useEffect(() => {
    if (!user) return;

    getData(user.uid, id).then((data) => {
      if (!data) setNote({ error: true });
      else setNote(data as NoteData);
    });
  }, [user, id]);

  useEffect(() => {
    if (note && !note.error)
      fetch("/api/google/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: note.transcript,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const arr: {
            id: number;
            frontHTML: ReactElement;
            backHTML: ReactElement;
          }[] = [];
          data.result.forEach((card: FlashCard) => {
            arr.push({
              id: card.id,
              frontHTML: (
                <div className="rounded-2xl bg-box border-2 whitespace-break-spaces border-bb px-12 py-3 flex text-center items-center justify-center h-full w-full text-color md:text-xl text-lg font-semibold font-sans">
                  {card.front}
                </div>
              ),
              backHTML: (
                <div
                  id="flash"
                  className="rounded-2xl bg-box border-2 whitespace-break-spaces border-bb px-12 py-3 flex text-center items-center justify-center h-full w-full text-color lg:text-xl md:text-lg text-sm font-sans"
                >
                  <Markdown>{card.back}</Markdown>
                </div>
              ),
            });
          });
          setCards(arr);
        });
  }, [note]);

  if (user == false) router.push("/auth");

  if (!note || !note.title) return <Loader />;
  if (note.error) return <NotFoundError />;
  return (
    <main className="lg:px-8 px-12 lg:py-16 xl:py-24 py-12  pb-0 min-h-screen flex">
      <div className="h-fill lg:max-w-[85%] xl:max-w-[75%] max-w-[100%] w-full mx-auto flex flex-col gap-6 transition-all duration-300 animate-fade">
        <div className="flex items-center gap-4">
          <Back href={`/notes/${id}`} />
          <h1 className="lg:text-5xl md:text-4xl text-3xl text-color font-semibold transition-all duration-300">
            {note.title}
          </h1>
        </div>
        {cards && cards.length > 0 ? (
          <>
            <div className="flex items-center justify-center lg:h-[55%] md:h-[70%] h-[80%] gap-6">
              <div className="w-16 justify-center md:flex hidden">
                <button
                  disabled={currentCard === 1}
                  onClick={() => controlRef.current.prevCard()}
                  className={`${
                    currentCard <= 1 ? "hidden" : "block"
                  } rounded-full p-2 aspect-square bg-light text-bg h-[32px] active:bg-hue active:text-accent active:px-3 active:translate-x-2 hover:-translate-x-2 hover:aspect-auto hover:px-4 transition-all duration-100`}
                >
                  <IoCaretBack />
                </button>
              </div>
              <FlashcardArray
                forwardRef={controlRef}
                controls={false}
                showCount={false}
                onCardChange={(id, index) => {
                  setCurrentCard(index);
                }}
                frontCardStyle={{
                  borderRadius: "24px",
                  background: "transparent",
                  width: "fill-content",
                }}
                backCardStyle={{
                  borderRadius: "24px",
                  background: "transparent",
                }}
                cards={cards as any}
              />
              <div className="w-16 justify-center md:flex hidden">
                <button
                  disabled={currentCard === cards.length}
                  onClick={() => controlRef.current.nextCard()}
                  className={`${
                    currentCard === cards.length ? "hidden" : "block"
                  } rounded-full p-2 aspect-square bg-light text-bg h-[32px] active:bg-hue active:text-accent active:px-3 active:translate-x-2 hover:-translate-x-2 hover:aspect-auto hover:px-4 transition-all duration-100`}
                >
                  <IoCaretForward />
                </button>
              </div>
            </div>

            <div className="z-10 md:hidden absolute bottom-16 left-0 w-full flex items-center justify-center gap-16">
              <div className="w-[90px] flex justify-center">
                <button
                  disabled={currentCard === 1}
                  onClick={() => controlRef.current.prevCard()}
                  className={`${
                    currentCard <= 1 ? "invisible" : "visible"
                  } rounded-full flex justify-center items-center p-2 text-xl aspect-square bg-light text-bg h-[48px] active:bg-hue hover:-translate-x-2 hover:aspect-auto hover:px-8 transition-all duration-100`}
                >
                  <IoCaretBack />
                </button>
              </div>
              <div className="w-[90px] flex justify-center">
                <button
                  disabled={currentCard === cards.length}
                  onClick={() => controlRef.current.nextCard()}
                  className={`${
                    currentCard === cards.length ? "invisible" : "visible"
                  } rounded-full flex justify-center items-center p-2 text-xl aspect-square bg-light text-bg h-[48px] hover:-translate-x-2 hover:aspect-auto hover:px-8 transition-all duration-100`}
                >
                  <IoCaretForward />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-box border-2 border-bb px-4 py-3 h-72 flex gap-4 items-center justify-center mt-16 w-full mx-auto md:w-[60%]">
            <Gemini className="text-3xl" />
            <h1 className="text-xl font-semibold">Shuffling Flashcards..</h1>
          </div>
        )}
      </div>
    </main>
  );
}
