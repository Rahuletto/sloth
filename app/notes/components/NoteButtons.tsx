import SlidingShelf from "@/components/ui/SlidingShelf";
import { motion } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";

export const RecordButton = ({
  recording,
  onClick,
  disabled,
}: {
  recording: boolean;
  onClick: () => void;
  disabled: boolean;
}) => (
  <motion.button
    initial={{
      opacity: 0,
      paddingLeft: "3rem",
      paddingRight: "3rem",
      backgroundColor: "var(--accent)",
      color: "var(--bg)",
      borderWidth: 2,
      borderColor: "var(--accent)",
    }}
    animate={{ opacity: 1 }}
    whileHover={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
    whileTap={{
      scale: 0.9,
      borderColor: "var(--accent)",
      backgroundColor: recording ? "var(--accent)" : "#00000000",
      color: recording ? "var(--bg)" : "var(--accent)",
    }}
    transition={{ duration: 0.3 }}
    disabled={disabled}
    onClick={onClick}
    className={`py-4 text-xl rounded-full text-bg ${
      recording ? "" : "active:bg-transparent active:text-accent"
    } z-20 font-semibold`}
  >
    {recording ? "Stop" : "Record"}
  </motion.button>
);

export const AddButton = ({
  open,
  setOpen,
  children
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode
}) => {
  return (
    <>
      <motion.button
        initial={{
          opacity: 0,
          scale: 1,
          visibility: "visible",
          color: "var(--light-bg)",
          borderColor: "var(--light-bg)",
          rotate: 0,
        }}
        animate={{
          rotate: open ? 135 : 0,
          color: open ? "var(--accent)" : "var(--light-bg)",
          borderColor: open ? "var(--accent)" : "var(--light-bg)",
          opacity: 1,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{
          scale: 0.9,
          color: "var(--accent)",
          borderColor: "var(--accent)",
        }}
        onClick={() => setOpen((prev) => !prev)}
        transition={{ duration: 0.3 }}
        className="z-20 border-2 p-3 flex justify-center items-center text-2xl aspect-square rounded-full"
      >
        <FaPlus />
      </motion.button>
      <SlidingShelf open={open} enableDesktopMode setOpen={setOpen}>
        {children}
      </SlidingShelf>
    </>
  );
};
