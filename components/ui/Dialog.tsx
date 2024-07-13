/** eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import type React from "react";
import { type ReactNode, useEffect } from "react";
import { IoWarning } from "react-icons/io5";

export default function Dialog({
  setOpen,
  children,
  open = false,
  clickHandler,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  open?: boolean;
  clickHandler?: () => void;
}) {
  useEffect(() => {
    if (open) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        } else if (event.key === "Enter" && clickHandler) {
          clickHandler();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickHandler, open, setOpen]);

  return (
    open && (
      <motion.div
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        initial={{
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
        animate={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        transition={{ duration: 0.2 }}
        className="z-50 fixed cursor-pointer left-0 top-0 flex items-center justify-center h-screen w-screen p-2 backdrop-blur-md bg-[rgba(0,0,0,0.5)]"
        style={{
          top: 0,
        }}
        onClick={() => setOpen(false)}
      >
        <div className="animate-fade cursor-default z-40 p-6 flex flex-col justify-between items-center aspect-square max-w-[350px] w-full rounded-3xl bg-category border-2 border-warn">
          <div className="flex flex-col gap-4 items-center justify-center">
            <IoWarning className="text-warn text-6xl mb-2" />
            <h1 className="text-xl font-medium text-center">{children}</h1>
          </div>
          <div className="flex gap-1 flex-col w-full">
            {clickHandler && (
              <button
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    clickHandler?.();
                  }
                }}
                onClick={clickHandler}
                type="button"
                tabIndex={0}
                className="relative w-full px-4 py-3 flex items-center justify-center rounded-lg bg-warn text-bg font-semibold transition-all duration-300"
              >
                Sure
                <kbd className="opacity-50 absolute font-mono text-sm right-3 bg-[rgba(0,0,0,0.2)] text-bg rounded-lg px-2 h-fit hidden lg:block">
                  ⮐
                </kbd>
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              tabIndex={0}
              type="button"
              className="relative w-full px-4 py-3 flex items-center justify-center rounded-lg bg-alt transition-all duration-300"
            >
              Cancel
              <kbd className="opacity-50 absolute font-mono text-base right-3 bg-[rgba(255,255,255,0.2)] text-color rounded-lg px-2 h-fit hidden lg:block">
                esc
              </kbd>
            </button>
          </div>
        </div>
      </motion.div>
    )
  );
}
