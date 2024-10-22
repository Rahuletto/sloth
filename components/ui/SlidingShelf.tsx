import { motion } from "framer-motion";
import type React from "react";
import type { ReactNode } from "react";

export default function SlidingShelf({
  setOpen,
  children,
  open = false,
  enableDesktopMode = false,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  open?: boolean;
  enableDesktopMode?: boolean;
}) {
  return (
    <>
      <motion.div
        initial={{
          y: enableDesktopMode ? 50 : 200,
          opacity: 0,
          zIndex: -1,
        }}
        animate={{
          // eslint-disable-next-line no-nested-ternary
          y: open ? 0 : enableDesktopMode ? 50 : 200,
          opacity: open ? 1 : 0,
          zIndex: open ? 10 : -1,
        }}
        transition={{ duration: enableDesktopMode ? 0.1 : 0.3 }}
        className={`${enableDesktopMode ? "md:bottom-32" : "lg:hidden"} bottom-0 fixed w-[100vw] pointer-events-none left-0 items-center flex`}
      >
        {open && <div
          className={`transition-all duration-200 pointer-events-auto flex flex-col gap-6 ${enableDesktopMode ? "md:rounded-3xl md:py-4 md:px-6" : ""} pb-32 rounded-t-3xl px-8 py-3 bg-category shadow-[0px_0px_40px_10px_var(--category)] h-fit md:max-w-[90vw] max-w-[100vw] mx-auto`}
        >
          <div
            className={`bg-box w-[10%] p-0.5 ${enableDesktopMode ? "md:hidden" : ""} rounded-xl mx-auto`}
          />
          {children}
        </div>}
      </motion.div>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
          }}
          animate={{
            opacity: open ? 1 : 0,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          transition={{ duration: 0.3 }}
          className="fixed cursor-pointer left-0 h-screen w-screen p-2 backdrop-blur-md bg-[rgba(0,0,0,0.5)]"
          style={{
            top: 0,
          }}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
