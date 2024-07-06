/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Loader from "@/components/ui/Loader";
import { getAllNotes, setData } from "@/firebase/firestore";
import { uploadAudioFromDataURL } from "@/firebase/storage";
import useVisualizer from "@/hooks/useVisualizer";
import { useAuth } from "@/provider/UserProvider";
import { Note, NoteData } from "@/types/NoteData";
import { TopicData } from "@/types/Topic";
import { getAudioLength } from "@/utils/audioLength";
import { blobToDataURL } from "@/utils/blobToData";
import { generateId } from "@/utils/generateId";
import { User } from "firebase/auth";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder-2").then((mod) => mod.ReactMediaRecorder),
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

const RecordingStatus = dynamic(
  () =>
    import("./components/RecordingStatus").then((mod) => mod.RecordingStatus),
  { ssr: false }
);

const RecordButton = dynamic(
  () => import("./components/NoteButtons").then((mod) => mod.RecordButton),
  { ssr: false }
);

const AddButton = dynamic(
  () => import("./components/NoteButtons").then((mod) => mod.AddButton),
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

  const handleRecordingStop = async (dataUrl: string, user: User) => {
    const length = await getAudioLength(dataUrl);
    if (length <= 120) {
      setMessage(
        "Audio is less than 5 minutes. Lectures typically goes more than that right?"
      );
      return;
    }

    setGenerating(true);
    setGenStatus("Transcribing..");
    const transcribeRes = await fetch("/api/transcribe", {
      method: "POST",
      body: JSON.stringify({ data: dataUrl }),
    });
    const transcribe = await transcribeRes.json();

    if (transcribe.data) {
      setGenStatus("Uploading transcript..");
      const url = await uploadAudioFromDataURL(user.uid, dataUrl);

      setGenStatus("Generating notes..");
      try {
        const topicsRes = await fetch("/api/google/topics", {
          method: "POST",
          body: JSON.stringify({ prompt: transcribe.data }),
        });
        const topics = await topicsRes.json();
        const title = topics.result.title;
        await saveNote(
          user,
          dataUrl,
          title,
          url,
          transcribe.data,
          topics.result
        );
      } catch (error) {
        console.error("Error getting topics:", error);
        await saveNote(user, dataUrl, "New Note", url, transcribe.data, []);
      }
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!user) return;
    if (!destination) return;

    if (source.index === destination.index && source.droppableId === destination.droppableId) return;
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

  const saveNote = async (
    user: User,
    dataUrl: string,
    title: string,
    url: string,
    transcript: string,
    topics: TopicData[]
  ) => {
    const id = generateId(dataUrl);
    await setData(`${user.uid}`, id, {
      id,
      createdAt: Date.now(),
      audio: url,
      transcript,
      title: title,
      topics: JSON.stringify(topics),
      category: "Uncategorized",
    });
    setGenerating(false);
    setGenStatus("Notes generated.");
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
  };

  if (user === null) return <Loader />;
  if (user === false) return null;

  return (
    <ReactMediaRecorder
      audio
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        previewAudioStream,
      }) => {
        useVisualizer(status, previewAudioStream, canvasRef);

        const startRecord = () => {
          try {
            window.navigator.vibrate(10);
          } catch {}
          if (recording) {
            stopRecording();
          } else {
            setRecording(true);
            startRecording();
          }
        };

        useEffect(() => {
          if (status === "stopped" && mediaBlobUrl) {
            blobToDataURL(mediaBlobUrl).then((dataUrl) => {
              setRecording(false);
              handleRecordingStop(dataUrl, user as User);
            });
          }
        }, [status, mediaBlobUrl]);

        return (
          <main className="overflow-hidden duration-300 transition-all animate-fade h-screen w-screen p-6">
            <DragDropContext onDragEnd={onDragEnd}>
              <motion.div
                className="w-[89vw] md:w-[97vw] overflow-hidden px-0 py-4 md:px-12 md:py-8 overflow-y-auto fixed h-[85vh] rounded-3xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: recording || message ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="ml-4 md:ml-0 lg:text-5xl text-3xl font-semibold">
                  Library
                </h1>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(28rem,1fr))] auto-rows-auto gap-4 mt-8">
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
              <div className="flex absolute w-full left-0 top-[40vh] items-center justify-center">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-semibold text-center"
                >
                  {message}
                </motion.h1>
              </div>
            )}

            {recording && (
              <>
                <RecordingStatus status={status} />
                <motion.canvas
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 w-full left-0 h-48"
                  ref={canvasRef}
                  id="canvas"
                ></motion.canvas>
                <div className="absolute bg-gradient-to-r bottom-0 w-full left-0 h-48 from-bg via-transparent to-bg z-10" />
              </>
            )}

            <div
              className={`duration-300 transition-all max-h-[60px] absolute ${
                recording ? "bottom-16" : "bottom-12"
              } z-20 left-0 w-full flex justify-center items-center gap-6`}
            >
              <RecordButton
                recording={recording}
                onClick={startRecord}
                disabled={!!message}
              />
              {!recording && <AddButton />}
            </div>
          </main>
        );
      }}
    />
  );
}
