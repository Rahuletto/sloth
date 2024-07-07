import { useEffect, useState } from "react";
import { AiFillAudio } from "react-icons/ai";
import { MdFilePresent } from "react-icons/md";
import { RiPresentationFill } from "react-icons/ri";
import PdfToTextConverter from "./uploads/Pdf";

export function AddActions({ restart }: { restart: boolean }) {
  const [mode, setMode] = useState<"pdf" | "audio" | "youtube" | "">("");

  useEffect(() => {
    if (restart) {
        setTimeout(() => setMode(""),500)
    }
  }, [restart]);

  return (
    <div className="flex flex-col w-full justify-start items-start gap-2 transition-all duration-300">
      {mode == "pdf" ? (
        <div className="transition-all duration-300 animate-fade">
          <PdfToTextConverter />
        </div>
      ) : mode == "audio" ? (
        <></>
      ) : mode == "youtube" ? (
        <></>
      ) : (
        <>
          <button
            onClick={() => setMode("pdf")}
            className="text-lg w-full flex gap-2 items-center text-left px-5 py-2 rounded-xl hover:bg-bb font-medium"
          >
            <MdFilePresent /> Upload PDF
          </button>
          <button
            onClick={() => setMode("audio")}
            className="text-lg w-full flex gap-2 items-center text-left px-5 py-2 rounded-xl hover:bg-bb font-medium"
          >
            <AiFillAudio /> Upload Audio
          </button>
          <button
            onClick={() => setMode("youtube")}
            className="text-lg w-full flex gap-2 items-center text-left px-5 py-2 rounded-xl hover:bg-bb font-medium"
          >
            <RiPresentationFill /> Upload Youtube Lecture
          </button>
        </>
      )}
    </div>
  );
}
