"use client";
import React, { useEffect, useRef, useState } from "react";
import { getData } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import { NoteData } from "@/types/NoteData";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import NotFoundError from "@/app/not-found";
import Loader from "@/components/ui/Loader";
import { RiLoaderLine } from "react-icons/ri";
import { QuizData } from "@/types/Quiz";
import QuizCard from "./components/QuizCard";
import Back from "@/components/ui/Back";
import { Link } from "next-view-transitions";

export default function Quiz({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = useAuth();
  const router = useRouter();
  const [note, setNote] = useState<DocumentData | null>(null);
  const [quiz, setQuiz] = useState<QuizData[] | null>(null);
  const [grade, setGrade] = useState<(null | "correct" | "wrong")[]>([]);
  const [percent, setPercent] = useState(0);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    getData(user.uid, id).then((data) => {
      if (!data) setNote({ error: true });
      else setNote(data as NoteData);
    });
  }, [user, id]);

  useEffect(() => {
    if (note && !note.error)
      fetch("/api/google/quiz", {
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
          setQuiz(data.result);
          setGrade(new Array(data.result.length).fill(null));
        });
  }, [note]);

  useEffect(() => {
    setPercent(
      Math.floor(
        (grade.filter((g) => g === "correct").length / grade.length) * 100
      )
    );
  }, [grade]);

  if (user == false) router.push("/auth");

  if (!note || !note.title) return <Loader />;
  if (note.error) return <NotFoundError />;
  return (
    <main className="lg:px-8 px-12 lg:py-16 xl:py-24 py-12 max-h-screen flex">
      <div className="lg:max-w-[85%] xl:max-w-[75%] max-w-[100%] h-fill w-full mx-auto flex flex-col gap-6 transition-all duration-300 animate-fade">
        <div className="flex items-center gap-4">
          <Back href={`/notes/${id}`} />
          <h1 className="lg:text-5xl md:text-4xl text-3xl text-color font-semibold transition-all duration-300">
            {note.title}
          </h1>
        </div>
        {quiz && quiz.length > 0 ? (
          <>
            <div
              ref={container}
              id="quizContainer"
              className="flex scrollbar-thin scrollbar-h-0 flex-row overflow-x-auto snap-x snap-center lg:h-auto h-[69dvh] md:h-auto snap-mandatory items-center gap-8 lg:px-4 rounded-3xl"
            >
              <div className="md:min-w-[10vw] md:p-10 md:block hidden" />
              {quiz.map((q, i) => (
                <QuizCard
                  setGrade={setGrade}
                  grade={[...grade]}
                  num={i + 1}
                  container={container}
                  key={i}
                  question={q.question}
                  options={q.options}
                  answer={q.answer}
                />
              ))}
              <div className="md:min-w-[20vw] md:p-10 md:block hidden" />
            </div>
            <h2
              className={`${
                grade.filter((g) => g === null).length <= 0
                  ? "text-7xl scale-110"
                  : "text-5xl scale-100"
              } mx-auto lg:mt-12 mt-4 ${
                grade.filter((g) => g === null).length <= 0
                  ? percent >= 50
                    ? "text-green"
                    : "text-accent"
                  : "text-color"
              } font-mono font-bold transition-all duration-300`}
            >
              {percent}
              <span className="text-color text-2xl opacity-60 font-sans">
                %
              </span>
            </h2>
            {grade.filter((g) => g === null).length <= 0 && (
              <>
                <h3 className="text-2xl opacity-80 font-medium text-center w-full transition-all duration-300 animate-fade">
                  Final score
                </h3>
                <Link
                  href={`/notes/${id}`}
                  className="bg-accent w-fit mx-auto hover:px-8 active:scale-90 active:bg-bg active:border-accent active:text-accent border-2 border-transparent text-center transition-all duration-300 animate-fade rounded-full px-6 py-3 text-bg font-semibold text-lg"
                >
                  Return home
                </Link>
              </>
            )}
          </>
        ) : (
          <div className="rounded-2xl bg-box border-2 border-bb px-4 py-3 h-72 flex gap-4 items-center justify-center mt-16 w-full mx-auto md:w-[60%]">
            <RiLoaderLine className="animate-spin duration-1000 transition-all" />
            <h1 className="text-xl font-semibold">Curating questions..</h1>
          </div>
        )}
      </div>
    </main>
  );
}
