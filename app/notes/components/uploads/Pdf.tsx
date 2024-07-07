"use client";
import React, { useState, useCallback } from "react";
import { Note } from "@/types/NoteData";
import { useAuth } from "@/provider/UserProvider";
import { saveNote } from "@/firebase/firestore";
import { uploadFile } from "@/firebase/storage";
import FileUploadArea from "./FileUploadArea";
import { readFile } from "@/utils/readFile";

export default function PdfToTextConverter({
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
  const [text, setText] = useState("");
  const [src, setSrc] = useState<{ url: string; type: "pdf" }[]>([]);

  const save = useCallback(
    async (saveText: string, saveSrc: { url: string; type: "pdf" }[]) => {
      if (!user || !saveText.trim()) return;

      setGenStatus("Gathering topics...");
      const topicsRes = await fetch("/api/google/topics", {
        method: "POST",
        body: JSON.stringify({ prompt: saveText.trim() }),
      });
      const topics = await topicsRes.json();
      const title = topics.result.title;

      const newNotes = await saveNote({
        user,
        title,
        src: saveSrc,
        transcript: saveText,
        topics: topics.result,
      });

      setGenerating(false);
      setGenStatus("Notes generated");
      setText("");
      setSrc([]);
      setNotes(newNotes);
    },
    [user, setGenerating, setGenStatus, setNotes]
  );

  const handleFiles = async (files: File[]) => {
    if (!user) return;

    setGenerating(true);
    setGenStatus("Processing files...");

    let newText = text;
    let newSrc = [...src];

    for (const file of files) {
      if (file.name.endsWith(".pdf")) {
        const fileText = await readFile(file);
        newText += fileText;

        const uploadUrl = await uploadFile(user.uid, file);
        newSrc.push({ url: uploadUrl, type: "pdf" });
      }
    }

    setText(newText);
    setSrc(newSrc);

    await save(newText, newSrc);
  };

  return (
    <FileUploadArea
      onFilesReceived={handleFiles}
      generating={generating}
      genStatus={genStatus}
    />
  );
}
