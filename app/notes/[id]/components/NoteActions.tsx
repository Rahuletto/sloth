import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import SlidingShelf from "@/components/ui/SlidingShelf";
import { IoSparkles } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/UserProvider";
import { deleteData } from "@/firebase/firestore";
import Actions from "./subcomponents/Actions";

export default function NoteActions({
  note,
  id,
  focus,
  setFocus,
  open,
  setOpen,
}: {
  id: string;
  note: any;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useAuth();
  const router = useRouter();

  function del() {
    if (user) {
      const p = confirm("Are you sure you want to delete this note?");
      if (p) {
        deleteData(user.uid, id);
        router.push("/notes");
      }
    }
  }
  return (
    <>
      {/* PC */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: focus ? 200 : 0 }}
        transition={{ duration: 0.3 }}
        className="lg:flex w-[35%] flex-col gap-6 h-fit lg:sticky lg:top-12 hidden"
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
            onClick={del}
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
          onClick={del}
          className="hover:border-accent border-2 border-transparent text-accent text-lg w-full text-left px-5 py-2 rounded-xl bg-hue font-semibold flex gap-3 items-center justify-start transition-all duration-300"
        >
          <FaTrashCan className="text-xl" /> Delete
        </button>
      </SlidingShelf>
    </>
  );
}
