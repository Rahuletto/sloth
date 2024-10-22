import Gemini from "@/components/ui/Gemini";
import type React from "react";
import { useRef, useState } from "react";
import { FaFire } from "react-icons/fa6";
import type { FileUploadAreaProps } from "./FileUploadArea";

export default function AudioUploadArea({
  onFilesReceived,
  generating,
  genStatus,
}: FileUploadAreaProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (files) {
      onFilesReceived(Array.from(files));
    }
  };

  const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    setDragging(false);
    handleFiles(ev.dataTransfer.files);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  return (
    <div
      onClick={() => !generating && hiddenFileInput.current?.click()}
      onDrop={onDrop}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          hiddenFileInput.current?.click();
        }
      }}
      role="button"
      tabIndex={0}
      className="my-2 transform-all duration-300 active:bg-[rgba(0,0,0,0.3)] active:scale-95 font-medium font-mono cursor-pointer flex gap-4 rounded-2xl border-4 max-w-[450px] px-8 py-4 aspect-video border-alt text-light flex-col items-center justify-center border-dashed"
    >
      <span
        className={`${generating ? "animate-geminiSpin" : "duration-200"} transition-all ${dragging ? "text-5xl text-accent" : "text-3xl text-light"
          }`}
      >
        {generating ? <Gemini /> : <FaFire />}
      </span>
      <p className="font-mono max-w-[350px] text-center">
        {generating
          ? genStatus
          : "Let's listen to the audio, You can throw it to me like its a hot cake."}
      </p>
      <input
        ref={hiddenFileInput}
        className="hidden"
        type="file"
        accept="audio/*"
        onChange={onFileChange}
      />
    </div>
  );
}
