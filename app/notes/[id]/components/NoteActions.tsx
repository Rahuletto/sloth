import SlidingShelf from "@/components/ui/SlidingShelf";
import { deleteData } from "@/firebase/firestore";
import { deleteFile } from "@/firebase/storage";
import { useAuth } from "@/provider/UserProvider";
import type { NoteData } from "@/types/NoteData";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";

const Dialog = dynamic(
  () => import("@/components/ui/Dialog").then((mod) => mod.default),
  { ssr: false },
);

const Actions = dynamic(
  () => import("./subcomponents/Actions").then((mod) => mod.default),
  { ssr: false },
);

export default function NoteActions({
  note,
  id,
  focus,
  setFocus,
  open,
  setOpen,
}: {
  id: string;
  note: NoteData;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useAuth();
  const router = useRouter();
  const [dialog, setDialog] = useState(false);

  function clickHandler() {
    if (!user) return setDialog(false);
    for (const file of note.src) {
      if (file.type !== "youtube")
        deleteFile(file.url)
    };
    deleteData(user.uid, id).then(() => {
      router.push("/notes");
    })

    return 0;
  }

  return (
    <>
      <Dialog open={dialog} clickHandler={clickHandler} setOpen={setDialog}>
        Are you sure you want to delete this note?
      </Dialog>

      {/* PC */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: focus ? 200 : 0 }}
        transition={{ duration: 0.3 }}
        className="animate-fade lg:flex w-full flex-col gap-6 h-fit lg:sticky lg:top-12 hidden"
      >
        <Actions topics={note.topics} focus={focus} id={id} />
        <div className="flex gap-2 flex-col">
          {!focus && (
            <button
              type="button"
              onClick={() => setFocus((prev) => !prev)}
              className="text-lg w-full text-left px-5 py-2 rounded-xl hover:bg-bb font-semibold hidden lg:flex gap-3 items-center justify-start transition-all duration-300"
            >
              <IoSparkles /> Focus
            </button>
          )}
          <button
            type="button"
            onClick={() => setDialog(true)}
            className="hover:border-accent border-2 border-transparent text-accent text-lg w-full text-left px-5 py-2 rounded-xl bg-hue font-semibold flex gap-3 items-center justify-start transition-all duration-300"
          >
            <FaTrashCan className="text-xl" /> Delete
          </button>
        </div>
      </motion.div>
      {/* Mobile */}
      <SlidingShelf open={open} setOpen={setOpen}>
        <Actions topics={note.topics} focus={focus} id={id} />
        <button
          type="button"
          onClick={() => setDialog(true)}
          className="hover:border-accent border-2 border-transparent text-accent text-lg w-full text-left px-5 py-2 rounded-xl bg-hue font-semibold flex gap-3 items-center justify-start transition-all duration-300"
        >
          <FaTrashCan className="text-xl" /> Delete
        </button>
      </SlidingShelf>
    </>
  );
}
