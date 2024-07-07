import React, { useRef, useState } from "react";
import { FaFire } from "react-icons/fa6";
import { RiLoader2Fill } from "react-icons/ri";

interface FileUploadAreaProps {
  onFilesReceived: (files: File[]) => void;
  generating: boolean;
  genStatus: string;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFilesReceived,
  generating,
  genStatus,
}) => {
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
      onClick={() => hiddenFileInput.current?.click()}
      onDrop={onDrop}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      className="my-2 font-medium font-mono cursor-pointer flex gap-4 rounded-2xl border-4 max-w-[450px] px-8 py-4 aspect-video border-alt text-light flex-col items-center justify-center border-dashed"
    >
      <span
        className={`${generating ? "animate-spin" : ""} transition-all duration-200 ${
          dragging ? "text-5xl text-accent" : "text-3xl text-light"
        }`}
      >
        {generating ? <RiLoader2Fill /> : <FaFire />}
      </span>
      <p className="max-w-[350px] text-center">
        {generating ? genStatus : "Let's upload the PDF file(s). or just throw it to me like its a hot cake."}
      </p>
      <input
        multiple
        ref={hiddenFileInput}
        className="hidden"
        type="file"
        accept=".pdf"
        onChange={onFileChange}
      />
    </div>
  );
};

export default FileUploadArea;