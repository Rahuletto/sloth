/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Loader from "@/components/ui/Loader";
import { getAllNotes, setData } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import { Note, NoteData } from "@/types/NoteData";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Recorder = dynamic(
  () => import("./components/Recorder").then((mod) => mod.default),
  { ssr: false }
);


const Category = dynamic(
  () => import("./components/Category").then((mod) => mod.Category),
  { ssr: true }
);

const GeneratingNote = dynamic(
  () => import("./components/GeneratingNote").then((mod) => mod.GeneratingNote),
  { ssr: false }
);

export default function Notes() {
  const user = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [recording, setRecording] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState("Generating notes..");
  const [notes, setNotes] = useState<{ [key: string]: Note[] }>({
    Starred: [],
    Uncategorized: [],
  });

  useEffect(() => {
    if (message) setTimeout(() => setMessage(""), 6000);
  }, [message]);

  useEffect(() => {
    if (user === false) router.push("/auth");
    else if (user !== null)
      setTimeout(() => {
        navigator.permissions.query({ name: "microphone" as any });
        getAllNotes(`${user.uid}`).then((allNotes) => {
          const categorizedNotes = allNotes.reduce(
            (acc: any, note: { id: string; data: NoteData }) => {
              const category = note.data?.category || "computer";
              if (!acc[category]) acc[category] = [];
              acc[category].push(note);
              return acc;
            },
            { Starred: [], Uncategorized: [] }
          );
          setNotes(categorizedNotes);
        });
      }, 200);
  }, [user, router]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!user) return;
    if (!destination) return;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;
    const newNotes = { ...notes };
    const movedNote = newNotes[source.droppableId].splice(source.index, 1)[0];
    movedNote.data.category = destination.droppableId;

    if (!newNotes[destination.droppableId]) {
      newNotes[destination.droppableId] = [];
    }
    newNotes[destination.droppableId].splice(destination.index, 0, movedNote);

    setNotes(newNotes);

    try {
      if (source.droppableId === destination.droppableId) return;
      await setData(user.uid, movedNote.data.id, movedNote.data);
    } catch (error) {
      console.error("Error updating note category: ", error);
    }
  };

  if (user === null) return <Loader />;
  if (user === false) return null;

  return (
    <main className="overflow-hidden duration-300 transition-all animate-fade h-screen w-screen p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <motion.div
          className="w-[89vw] md:w-[97vw] overflow-hidden px-0 py-4 md:px-12 md:py-8 overflow-y-auto fixed h-[85dvh] rounded-3xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: recording || message ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="ml-4 md:ml-0 lg:text-5xl text-3xl font-semibold">
            Library
          </h1>
          <div className="md:grid md:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] flex flex-col md: auto-rows-auto gap-4 mt-8">
            {Object.entries(notes).map(([category, notes], i) => (
              <Category
                key={i}
                title={category}
                notes={notes}
                categoryId={category}
                generating={
                  category === "Uncategorized" && generating ? (
                    <GeneratingNote genStatus={genStatus} />
                  ) : null
                }
              />
            ))}
          </div>
        </motion.div>
      </DragDropContext>

      {message && (
        <div className="flex absolute lg:w-full left-0 top-[40dvh] items-center justify-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-[90%] text-2xl font-semibold text-center"
          >
            {message}
          </motion.h1>
        </div>
      )}
      <Recorder
        message={message}
        canvasRef={canvasRef}
        recording={recording}
        setRecording={setRecording}
        setGenerating={setGenerating}
        setGenStatus={setGenStatus}
        setMessage={setMessage}
        setNotes={setNotes}
      />
    </main>
  );
}
