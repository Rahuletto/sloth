"use client";
import React, { useState } from "react";
import { Note } from "@/types/NoteData";
import { useAuth } from "@/provider/UserProvider";
import { saveNote } from "@/firebase/firestore";

import { Input } from "@/components/ui/Input";

import { IoMdArrowRoundForward } from "react-icons/io";
import Gemini from "@/components/ui/Gemini";

export default function YoutubeLecture({
  setGenerating,
  generating,
  genStatus,
  setGenStatus,
  setNotes,
}: {
  setGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  generating: boolean;
  genStatus: string;
  setGenStatus: React.Dispatch<React.SetStateAction<string>>;
  setNotes: React.Dispatch<React.SetStateAction<{ [key: string]: Note[] }>>;
}) {
  const user = useAuth();
  const [url, setUrl] = useState("");

  function generateTranscript() {
    if (!url || !user) return;
    setGenerating(true);
    setGenStatus("Processing video...");

    const newSrc = [{ url, type: "youtube" }];
    fetch("/api/youtube", {
      method: "POST",
      body: JSON.stringify({ video: url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setGenStatus("Generating transcript...");
        const transcript = data.result;
        fetch("/api/google/topics", {
          method: "POST",
          body: JSON.stringify({ prompt: transcript.trim() }),
        })
          .then((res) => res.json())
          .then((topics) => {
            setGenStatus("Gathering topics...");
            const title = topics.result.title;
            const description = topics.result.description;
            saveNote({
              user,
              title,
              description,
              src: newSrc,
              transcript: transcript.trim(),
              topics: topics.result,
            }).then((newNotes) => {
              setGenerating(false);
              setGenStatus("Notes generated");
              setNotes(newNotes);
              setUrl("");
            });
          });
      });
  }

  return generating ? (
    <div className="my-2 font-medium font-mono cursor-pointer flex gap-4 rounded-2xl border-4 max-w-[450px] px-8 py-4 aspect-video border-alt text-light flex-col items-center justify-center border-dashed">
      <Gemini className="text-3xl " />
      <p className="max-w-[350px] text-center">{genStatus}</p>
    </div>
  ) : (
    <div className="flex gap-2 transition-all duration-200 animate-fade">
      <Input
        pattern="/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/"
        placeholder="Youtube URL"
        type="text"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <button
        className="px-5 hover:px-7 active:px-2 active:bg-hue active:text-accent active:scale-90 bg-accent text-bg transition-all duration-300 hover:bg-transparent text-xl py-2 hover:text-accent hover:border-accent rounded-full border-2 border-transparent"
        onClick={() => generateTranscript()}
      >
        <IoMdArrowRoundForward />
      </button>
    </div>
  );
}
