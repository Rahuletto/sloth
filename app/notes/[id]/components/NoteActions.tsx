import { motion } from "framer-motion";
import { PiCardsThreeDuotone } from "react-icons/pi";
import { TbMessageQuestion } from "react-icons/tb";
import NoteTopics from "./NoteTopics";
import { TopicData } from "@/types/Topic";
import { Dispatch, SetStateAction } from "react";
import { Link } from "next-view-transitions";

export default function NoteActions({
  note,
  id,
  focus,
  setFocus,
  open,
}: {
  id: string;
  note: any;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
}) {
  const topics: TopicData = JSON.parse(note.topics);

  return (
    <>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: focus ? 200 : 0 }}
        transition={{ duration: 0.3 }}
        className="lg:flex w-[35%] flex-col gap-6 h-fit lg:sticky lg:top-12 hidden"
      >
        <Actions topics={topics} focus={focus} id={id} />
        {!focus && (
          <button
            onClick={() => setFocus((prev) => !prev)}
            className="text-xl w-full text-left px-3 py-2 rounded-xl hover:bg-bb font-semibold hidden lg:flex gap-2 items-center justify-start transition-all duration-300 font-mono"
          >
            Focus
          </button>
        )}
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden left-0 fixed w-[100vw] bottom-0 items-center flex"
      >
        <div className="flex flex-col gap-6 pb-24 bg-category rounded-t-3xl py-3 px-8 shadow-[0px_0px_40px_10px_var(--category)] h-fit md:max-w-[90vw] max-w-[100vw] mx-auto">
          <div className="bg-box w-[10%] p-0.5 rounded-xl mx-auto" />
          <Actions topics={topics} focus={focus} id={id} />
        </div>
      </motion.div>
    </>
  );
}

function Actions({ topics, focus, id }: { topics: TopicData; focus: boolean; id: string}) {
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
