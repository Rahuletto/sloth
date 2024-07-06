"use client";
import NotFoundError from "@/app/not-found";
import Loader from "@/components/ui/Loader";
import { getData, setData } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import NoteHeader from "./NoteHeader";
import NoteSummary from "./NoteSummary";
import NoteActions from "./NoteActions";
import FocusButton from "./FocusButton";
import { motion } from "framer-motion";
import { NoteData } from "@/types/NoteData";

export default function NotePage({ id }: { id: string }) {
  const user = useAuth();
  const router = useRouter();
  const [note, setNote] = useState<DocumentData | null>(null);
  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user === false) router.push("/auth");
    else if (user?.uid) {
      getData(user?.uid, id).then((data) => {
        if (!data) setNote({ error: true });
        else setNote(data as NoteData);
      });
    }
  }, [user, id]);

  useEffect(() => {
    if (note && note.transcript && user) {
      if (!note.summary) {
        const temp = { ...note, summary: "" };
        fetch("/api/google/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: note.transcript,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            temp.summary = data.result;
            setNote(temp);
            setData(`${user.uid}`, id, temp);
          });
      }
    }
  }, [note, id, user]);

  if (user == false) router.push("/auth");

  if (!note || !note.title) return <Loader />;
  if (note.error) return <NotFoundError />;

  return (
    <motion.main
      initial={{ maxWidth: "1200px" }}
      animate={{ maxWidth: focus ? "1300px" : "1200px" }}
      className="px-8 md:py-24 py-12 pb-32 min-h-screen flex gap-6 mx-auto transition-all duration-300 animate-fade"
    >
      <div className="overflow-auto h-fit lg:min-w-[75%] w-full flex flex-col gap-6">
        <NoteHeader
          id={note.id}
          title={note.title}
          createdAt={note.createdAt}
        />
        <AudioPlayer src={note.audio} transcript={note.transcript} />
        <NoteSummary note={note} focus={focus} />
      </div>
      {!focus && <NoteActions note={note} id={id} focus={focus} setFocus={setFocus} open={open} />}
      <FocusButton focus={focus} setFocus={setFocus} />

      <div className="fixed shadow-[0px_40px_60px_90px_var(--background)] flex left-0 bottom-6 items-center justify-center w-full">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`lg:hidden mx-4 text-center text-xl font-semibold ${
            open
              ? "w-[320px] text-accent bg-hue border-accent"
              : "w-[500px] text-bg bg-accent border-transparent"
          } border-2 px-8 py-3 rounded-full transition-all duration-300`}
        >
          {open ? "Close" : "Details"}
        </button>
      </div>
    </motion.main>
  );
}