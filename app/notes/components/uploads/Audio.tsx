"use client";
import React, { useCallback } from "react";
import { Note } from "@/types/NoteData";
import { useAuth } from "@/provider/UserProvider";
import { saveNote } from "@/firebase/firestore";
import { uploadFile } from "@/firebase/storage";
import AudioUploadArea from "./AudioUploadArea";

export default function Audio({
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

  const save = useCallback(
    async (
      saveTranscript: string,
      saveAudioSrc: { url: string; type: "audio" }
    ) => {
      if (!user || !saveTranscript.trim()) return;
      setGenStatus("Gathering topics...");
      const topicsRes = await fetch("/api/google/topics", {
        method: "POST",
        body: JSON.stringify({ prompt: saveTranscript.trim() }),
      });
      const topics = await topicsRes.json();
      const title = topics.result.title;
      const description = topics.result.description;
      const newNotes = await saveNote({
        user,
        title,
        description,
        src: [saveAudioSrc],
        transcript: saveTranscript,
        topics: topics.result,
      });
      setGenerating(false);
      setGenStatus("Notes generated");
      setNotes(newNotes);
    },
    [user, setGenerating, setGenStatus, setNotes]
  );

  const handleAudioFile = async (files: File[]) => {
    if (!user) return;
    setGenerating(true);
    setGenStatus("Processing audio file...");
    const file = files[0];

    try {
      setGenStatus("Transcribing audio...");
      const reader = new FileReader();
      reader.onload = async (e) => {
        const audioData = e.target?.result as string;
        const transcribeRes = await fetch("/api/transcribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: audioData }),
        });
        const transcribeData = await transcribeRes.json();

        if (transcribeData.data) {
          const uploadUrl = await uploadFile(user.uid, file);
          await save(transcribeData.data, { url: uploadUrl, type: "audio" });
        } else {
          throw new Error("Transcription failed");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing audio:", error);
      setGenStatus("Error processing audio");
      setGenerating(false);
    }
  };

  return (
    <AudioUploadArea
      onFilesReceived={handleAudioFile}
      generating={generating}
      genStatus={genStatus}
    />
  );
}
