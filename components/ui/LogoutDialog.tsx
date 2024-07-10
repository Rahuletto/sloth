import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GrPowerShutdown } from "react-icons/gr";

export default function LogoutDialog({
  setOpen,
  open = false,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}) {
  const router = useRouter();
  useEffect(() => {
    if (open) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        } else if (event.key === "Enter") {
          router.push("/auth/logout");
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    return () => {};
  }, [open]);

  return (
    open && (
      <motion.div
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
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
        transition={{ duration: 0.2 }}
        className="z-30 fixed cursor-pointer left-0 top-0 flex items-center justify-center h-screen w-screen p-2 backdrop-blur-md bg-[rgba(0,0,0,0.5)]"
        style={{
          top: 0,
        }}
        onClick={() => setOpen(false)}
      >
        <div className="cursor-default z-40 p-6 flex flex-col justify-between items-center aspect-square max-w-[350px] w-full rounded-3xl bg-hue border-2 border-accent">
          <div className="flex flex-col gap-4 items-center justify-center">
            <GrPowerShutdown className="text-accent text-6xl mb-2" />
            <h1 className="text-xl font-medium text-center">
              Are you sure you want to log out?
            </h1>
          </div>
          <div className="flex gap-1 flex-col w-full">
            <button
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  router.push("/auth/logout");
                }
              }}
              onClick={() => router.push("/auth/logout")}
              type="button"
              tabIndex={0}
              className="relative w-full px-4 py-3 flex items-center justify-center rounded-lg bg-accent text-bg font-semibold transition-all duration-300"
            >
              Logout
              <kbd className="opacity-50 absolute font-mono text-sm right-3 bg-[rgba(0,0,0,0.2)] text-bg rounded-lg px-2 h-fit hidden lg:block">
                ⮐
              </kbd>
            </button>

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
