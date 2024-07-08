import React from "react";
import { PiCardsThreeDuotone } from "react-icons/pi";
import { TbMessageQuestion } from "react-icons/tb";
import { TopicData } from "@/types/Topic";
import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import NoteTopics from "../NoteTopics";

export default function Actions({
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
          role="button"
          tabIndex={0}
          href={`/notes/${id}/cards`}
          className="w-full opacity-60 hover:opacity-95 text-left px-3 py-2 rounded-xl hover:bg-accent hover:text-bg font-semibold flex gap-2 items-center justify-start transition-all duration-300 font-mono"
        >
          <PiCardsThreeDuotone /> Flash cards
        </Link>
        <Link
          role="button"
          tabIndex={0}
          href={`/notes/${id}/quiz`}
          className="w-full text-left opacity-60 hover:opacity-95 px-3 py-2 rounded-xl hover:bg-accent hover:text-bg font-semibold flex gap-2 items-center justify-start transition-all duration-300 font-mono"
        >
          <TbMessageQuestion /> Quiz
        </Link>
      </motion.div>
    </>
  );
}
