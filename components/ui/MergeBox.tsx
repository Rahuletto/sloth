import { motion } from "framer-motion";
import React, { type ReactNode } from "react";

export default function MergeBox({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{
        y: 200,
        opacity: 0,
        zIndex: -1,
      }}
      animate={{
        // eslint-disable-next-line no-nested-ternary
        y: 0,
        opacity: 1,
        zIndex: 0,
      }}
      transition={{ duration: 0.1 }}
      className="bottom-0 fixed w-[100vw] pointer-events-none left-0 items-center flex"
    >

      <div className="transition-all duration-200 pointer-events-auto flex flex-col gap-6 md:rounded-3xl md:mb-12 md:py-2 md:px-3 pb-32 rounded-t-3xl px-8 py-3 bg-category shadow-[0px_0px_40px_10px_var(--category)] h-fit md:max-w-[90vw] max-w-[100vw] mx-auto">
        {children}
      </div>

    </motion.div>
  );
}
