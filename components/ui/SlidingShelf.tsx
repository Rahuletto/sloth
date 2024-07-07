import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export default function SlidingShelf({
  open,
  setOpen,
  children,
}: {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: open ? 0 : 200, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="z-10 lg:hidden left-0 fixed w-[100vw] bottom-0 items-center flex"
      >
        <div className="flex flex-col gap-6 pb-24 bg-category rounded-t-3xl py-3 px-8 shadow-[0px_0px_40px_10px_var(--category)] h-fit md:max-w-[90vw] max-w-[100vw] mx-auto">
          <div className="bg-box w-[10%] p-0.5 rounded-xl mx-auto" />
          {children}
        </div>
      </motion.div>
      {open && (
        <div
          className="fixed cursor-pointer left-0 h-screen w-screen p-2 opacity-60 blur-md"
          style={{background: "var(--background)", top: 0, filter: "blur(10px)"}}
          onClick={() =>  setOpen(false)}
        />
      )}
    </>
  );
}
