"use client";
import React, { useRef, useState } from "react";
import { FaFire } from "react-icons/fa6";
import { pdfjs } from "react-pdf";

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfToTextConverter() {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const fire = useRef<HTMLSpanElement>(null);
  const [dragging, setDragging] = useState(false);

  function addFile() {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  }

  function dropHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();

          if (file && file.name.endsWith(".pdf")) readFile(file);
        }
      });
    } else {
      [...ev.dataTransfer.files].forEach((file, i) => {
        if (file && file.name.endsWith(".pdf")) readFile(file);
      });
    }
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.[0]) {
      Array.from(files).forEach((file) => {
        readFile(file);
      });
    }
  };

  return (
    <div
      onClick={addFile}
      onDrop={dropHandler}
      onDragLeave={() => setDragging(false)}
      onDragOver={() => setDragging(true)}
      className="my-2 font-medium font-mono cursor-pointer flex gap-4 rounded-2xl border-4 max-w-[450px] px-8 py-4 aspect-video border-alt text-light flex-col items-center justify-center border-dashed"
    >
      <span
        ref={fire}
        className={`transition-all duration-200 ${
          dragging ? "text-5xl text-accent" : "text-3xl text-light"
        }`}
      >
        <FaFire />
      </span>
      <p className="max-w-[350px] text-center">
        Let{"'"}s upload the PDF file{"(s)"}. or just throw it to me like its a
        hot cake.
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
}

function readFile(file: Blob) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const buffer = e.target?.result as ArrayBuffer;
    if (buffer) {
      const typedArray = new Uint8Array(buffer);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      let extractedText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const pageText = await page.getTextContent();
        extractedText += pageText.items
          .map((item) => (item as any).str)
          .join(" ");
      }
      console.log(extractedText);
    }
  };
  reader.readAsArrayBuffer(file);
}
