import type { TopicData } from "@/types/Topic";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa";

export default function NoteTopics({
  topics,
  focus,
}: {
  topics: TopicData;
  focus: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, height: "50px" }}
      animate={{ opacity: focus ? 0 : 1, height: !open ? "50px" : "25rem" }}
      transition={{ duration: 0.2 }}
      className="animate-fade bg-category rounded-2xl px-5 py-3 pb-5 overflow-hidden"
    >
      <div
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === "t") {
            setOpen((prev) => !prev);
          }
        }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between items-center mb-4"
      >
        <h2
          style={{ textDecorationSkipInk: "none" }}
          className="text-xl underline decoration-accent font-semibold font-mono"
          
        >
          Topics
        </h2>
        <FaCaretRight
          className={`transition-all duration-300 opacity-80 ${open && "rotate-90"}`}
        />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto h-full pb-12">
        {topics.topics.map((t, i: number) => (
          <div key={i}>
            <p className="opacity-80">{t.topic}</p>
            <ul className="ml-5 opacity-65 list-disc marker:text-accent">
              {t.subtopics.map((subtopic: string, j: number) => (
                <li className="text-sm" key={j}>
                  {subtopic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
