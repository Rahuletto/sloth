import { TopicData } from "@/types/Topic";
import { motion } from "framer-motion";

export default function NoteTopics({
  topics,
  focus,
}: {
  topics: TopicData;
  focus: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: focus ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="bg-category rounded-2xl px-5 py-3 pb-5"
    >
      <h2 className="text-xl mb-2 decoration-wavy underline decoration-accent font-semibold font-mono">
        Topics
      </h2>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-96">
        {topics.topics.map((t, i: number) => (
          <div key={i}>
            <p className="opacity-80">
              {t.topic}
            </p>
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
