import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { SiGooglegemini } from "react-icons/si";
import Gemini from "./Gemini";

export default function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card flex left-0 absolute z-10 items-center justify-center max-w-full w-full p-4 h-[12rem]"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0 "
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-6 w-full mx-auto flex items-center justify-center text-5xl">
          {hovered ? (
            <Gemini />
          ) : (
            <SiGooglegemini className="text-accent" />
          )}
        </div>
        <h2 className="dark:text-white text-xl text-center opacity-60 group-hover/canvas-card:opacity-0 group-hover/canvas-card:hidden relative italic z-10 text-black mt-4 font-semibold group-hover/canvas-card:text-white transition duration-200">
          (Hover over me)
        </h2>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-4 transition duration-200">
          {title}
        </h2>

        
      </div>
    </div>
  );
}