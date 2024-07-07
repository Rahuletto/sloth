import { motion } from "framer-motion";
import { PiCardsThreeDuotone } from "react-icons/pi";
import { TbMessageQuestion } from "react-icons/tb";
import NoteTopics from "./NoteTopics";
import { TopicData } from "@/types/Topic";
import { Dispatch, SetStateAction } from "react";
import { Link } from "next-view-transitions";
import SlidingShelf from "@/components/ui/SlidingShelf";

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
        {!focus && (
          <button
            onClick={() => setFocus((prev) => !prev)}
            className="text-lg w-full text-left px-5 py-2 rounded-xl hover:bg-bb font-semibold hidden lg:flex gap-2 items-center justify-start transition-all duration-300 font-mono"
          >
            Focus
          </button>
        )}
      </motion.div>
      {/* Mobile */}
      <SlidingShelf open={open} setOpen={setOpen}>
        <Actions topics={note.topics} focus={focus} id={id} />
      </SlidingShelf>
    </>
  );
}

function Actions({
  topics,
  focus,
  id,
}: {
  topics: TopicData;
  focus: boolean;
  id: string;
}) {
  return (
    <>
      <NoteTopics topics={topics} focus={focus} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: focus ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="bg-box border-2 border-bb flex flex-col gap-1 justify-start items-start rounded-2xl p-0.5"
      >
        <Link
          href={`/notes/${id}/cards`}
          className="w-full opacity-60 hover:opacity-95 text-left px-3 py-2 rounded-xl hover:bg-accent hover:text-bg font-semibold flex gap-2 items-center justify-start transition-all duration-300 font-mono"
        >
          <PiCardsThreeDuotone /> Flash cards
        </Link>
        <Link
          href={`/notes/${id}/quiz`}
          className="w-full text-left opacity-60 hover:opacity-95 px-3 py-2 rounded-xl hover:bg-accent hover:text-bg font-semibold flex gap-2 items-center justify-start transition-all duration-300 font-mono"
        >
          <TbMessageQuestion /> Quiz
        </Link>
      </motion.div>
    </>
  );
}
