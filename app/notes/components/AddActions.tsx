import React, { useEffect, useState } from "react";
import { AiFillAudio } from "react-icons/ai";
import { MdFilePresent } from "react-icons/md";
import { RiPresentationFill } from "react-icons/ri";
import { Note } from "@/types/NoteData";
import Pdf from "./uploads/Pdf";
import YoutubeLecture from "./uploads/YoutubeLecture";
import Audio from "./uploads/Audio";

export function AddActions({
  restart,
  setGenStatus,
  setGenerating,
  setNotes,
  generating,
  genStatus,
}: {
  restart: boolean;
  setGenStatus: React.Dispatch<React.SetStateAction<string>>;
  setGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  setNotes: React.Dispatch<React.SetStateAction<{ [key: string]: Note[] }>>;
  generating: boolean;
  genStatus: string;
}) {
  const [mode, setMode] = useState<"pdf" | "audio" | "youtube" | "">("");

  useEffect(() => {
    if (restart) {
      setTimeout(() => setMode(""), 10);
    }
  }, [restart]);

  return (
    <div className="pointer-events-none flex flex-col w-full justify-start items-start gap-2 transition-all duration-300">
      {mode === "pdf" && (
        <div className="pointer-events-auto transition-all duration-300 animate-fade">
          <Pdf
            setGenStatus={setGenStatus}
            setGenerating={setGenerating}
            generating={generating}
            genStatus={genStatus}
            setNotes={setNotes}
          />
        </div>
      )}
      {mode === "audio" && (
        <div className="pointer-events-auto transition-all duration-300 animate-fade">
          <Audio
            setGenStatus={setGenStatus}
            setGenerating={setGenerating}
            generating={generating}
            genStatus={genStatus}
            setNotes={setNotes}
          />
        </div>
      )}
      {mode === "youtube" && (
        <div className="pointer-events-auto transition-all duration-300 animate-fade">
          <YoutubeLecture
            setGenStatus={setGenStatus}
            setGenerating={setGenerating}
            generating={generating}
            genStatus={genStatus}
            setNotes={setNotes}
          />
        </div>
      )}
      {mode === "" && (
        <>
          <button
            type="button"
            onClick={() => setMode("pdf")}
            className="pointer-events-auto text-lg w-full flex gap-2 items-center text-left px-5 py-2 rounded-xl hover:bg-bb font-medium"
          >
            <MdFilePresent /> Upload PDF
          </button>
          <button
            type="button"
            onClick={() => setMode("audio")}
            className="pointer-events-auto text-lg w-full flex gap-2 items-center text-left px-5 py-2 rounded-xl hover:bg-bb font-medium"
          >
            <AiFillAudio /> Upload Audio
          </button>
          <button
            type="button"
            onClick={() => setMode("youtube")}
            className="pointer-events-auto text-lg w-full flex gap-2 items-center text-left px-5 py-2 rounded-xl hover:bg-bb font-medium"
          >
            <RiPresentationFill /> Upload Youtube Lecture
          </button>
        </>
      )}
    </div>
  );
}
