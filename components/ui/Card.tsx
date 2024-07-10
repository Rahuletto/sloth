import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Gemini from "./Gemini";

export default function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="group/canvas-card flex left-0 absolute z-10 items-center justify-center max-w-full w-full p-4 h-[12rem]">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-full w-full absolute inset-0 "
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center -translate-y-6 w-full mx-auto flex items-center justify-center text-5xl">
          <Gemini />
        </div>
        <h2 className="dark:text-white text-xl opacity-0 relative z-10 mt-4  font-bold text-white-translate-y-4 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
}
