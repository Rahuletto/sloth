/* eslint-disable react-hooks/rules-of-hooks */
import useVisualizer from "@/hooks/useVisualizer";
import { blobToDataURL } from "@/utils/blobToData";
import { User } from "firebase/auth";
import { motion } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  RefObject,
  useState,
} from "react";

import { useAuth } from "@/provider/UserProvider";
import dynamic from "next/dynamic";
import { uploadAudioFromDataURL } from "@/firebase/storage";
import { getAudioLength } from "@/utils/audioLength";
import { Note } from "@/types/NoteData";
import { AddActions } from "./AddActions";
import { saveNote } from "@/firebase/firestore";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder-2").then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);

const RecordingStatus = dynamic(
  () => import("./RecordingStatus").then((mod) => mod.RecordingStatus),
  { ssr: false }
);

const RecordButton = dynamic(
  () => import("./NoteButtons").then((mod) => mod.RecordButton),
  { ssr: false }
);

const AddButton = dynamic(
  () => import("./NoteButtons").then((mod) => mod.AddButton),
  { ssr: false }
);

interface RecorderProps {
  recording: boolean;
  setRecording: Dispatch<SetStateAction<boolean>>;
  canvasRef: RefObject<HTMLCanvasElement>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setGenerating: Dispatch<SetStateAction<boolean>>;
  generating: boolean;
  genStatus: string;
  setGenStatus: Dispatch<SetStateAction<string>>;
  setNotes: Dispatch<
    SetStateAction<{
      [key: string]: Note[];
    }>
  >;
}

export default function Recorder({
  recording,
  setRecording,
  canvasRef,
  message,
  setMessage,
  genStatus,
  setGenerating,
  generating,
  setGenStatus,
  setNotes,
}: RecorderProps) {
  const [open, setOpen] = useState(false);

  const user = useAuth();

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
        const description = topics.result.description;

        const newNotes = await saveNote({
          user,
          title,
          description,
          src: [{ type: "audio", url }],
          transcript: transcribe.data,
          topics: topics.result,
        });
        setNotes(newNotes);
      } catch (error) {
        console.error("Error getting topics:", error);
        setNotes(
          await saveNote({
            user,
            title: "New Note",
            description:
              "This is a new note with some errors? Can we try this again??",
            src: [{ type: "audio", url }],
            transcript: transcribe.data,
            topics: [],
          })
        );
      }
    }
  };

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
            navigator.permissions.query({ name: "microphone" as any });
            window.navigator.vibrate(10);
          } catch {}
          if (recording) {
            stopRecording();
          } else {
            navigator.permissions
              .query({ name: "microphone" as any })
              .then((a) => {
                console.log(a.state);
                if (a.state === "prompt") {
                  startRecording();
                  setRecording(true);

                  a.onchange = () => {
                    if (a.state === "granted") {
                      startRecording();
                      setRecording(true);
                    } else {
                      setMessage(
                        "Please allow microphone access to use record."
                      );
                    }
                  };
                } else if (a.state === "denied") {
                  setMessage("Please allow microphone access to use record.");
                  navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                  });
                } else if (a.state === "granted") {
                  startRecording();
                  setRecording(true);
                }
              });
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
          <>
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
              className={`duration-300 transition-all max-h-[60px] fixed ${
                recording ? "bottom-16" : "lg:bottom-12 bottom-8"
              } z-20 left-0 w-full flex justify-center items-center gap-6`}
            >
              <RecordButton
                recording={recording}
                onClick={() => startRecord()}
                disabled={!!message}
              />
              {!recording && (
                <AddButton open={open} setOpen={setOpen}>
                  <AddActions
                    restart={!open}
                    genStatus={genStatus}
                    generating={generating}
                    setGenStatus={setGenStatus}
                    setGenerating={setGenerating}
                    setNotes={setNotes}
                  />
                </AddButton>
              )}
            </div>
          </>
        );
      }}
    />
  );
}
