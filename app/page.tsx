"use client";
import React, { useState } from "react";
import { pdfjs } from "react-pdf";

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PdfToTextConverter: React.FC = () => {
  const [numPages, setNumPages] = useState(0);
  const [text, setText] = useState("");

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
          setText(extractedText);
          setNumPages(pdf.numPages);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={onFileChange} />
      {numPages > 0 && <p>Number of pages: {numPages}</p>}
      <textarea value={text} readOnly />
    </div>
  );
};

export default PdfToTextConverter;
