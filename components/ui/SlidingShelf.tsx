import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export default function SlidingShelf({
  open,
  setOpen,
  children,
  enableDesktopMode = false,
}: {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
    enableDesktopMode?: boolean;
}) {
  return (
    <>
      <motion.div
        initial={{ y: enableDesktopMode ? 50 : 200, opacity: 0 }}
        animate={{ y: open ? 0 : enableDesktopMode ? 50 : 200, opacity: open ? 1 : 0 }}
        transition={{ duration: (enableDesktopMode ? 0.1 : 0.3) }}
        className={`z-10 ${enableDesktopMode ? "md:bottom-32" : "lg:hidden"} bottom-0 fixed w-[100vw] pointer-events-none left-0 items-center flex`}
      >
        <div className={`transition-all duration-200 pointer-events-auto flex flex-col gap-6 ${enableDesktopMode ? "md:rounded-3xl md:py-4 md:px-6" : ""} pb-32 rounded-t-3xl px-8 py-3 bg-category shadow-[0px_0px_40px_10px_var(--category)] h-fit md:max-w-[90vw] max-w-[100vw] mx-auto`}>
          <div className={`bg-box w-[10%] p-0.5 ${enableDesktopMode ? "md:hidden" : ""} rounded-xl mx-auto`} />
          {children}
        </div>
      </motion.div>
      {open && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(0px)" }}
          animate={{ opacity: open ? 0.6 : 0, filter: "blur(10px)" }}
          transition={{ duration: 0.3 }}
          className="fixed cursor-pointer left-0 h-screen w-screen p-2 blur-md"
          style={{
            background: "var(--background)",
            top: 0,
            filter: "blur(10px)",
          }}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
