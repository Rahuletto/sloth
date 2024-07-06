import { motion } from "framer-motion";
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
    initial={{ opacity: 0, paddingLeft: "3rem", paddingRight: "3rem", backgroundColor: "var(--accent)", color: "var(--bg)", borderWidth: 2, borderColor: "var(--accent)" }}
    animate={{ opacity: 1 }}
    whileHover={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
    whileTap={{ scale: 0.9, borderColor: "var(--accent)", backgroundColor: recording ? "var(--accent)" : "transparent", color: recording ? "var(--bg)" : "var(--accent)"}}
    transition={{ duration: 0.3 }}
    disabled={disabled}
    onClick={onClick}
    className={`py-4 text-xl rounded-full text-bg ${
      recording ? "" : "active:bg-transparent active:text-accent"
    } font-semibold`}
  >
    {recording ? "Stop" : "Record"}
  </motion.button>
);

export const AddButton = () => (
  <motion.button
    initial={{
      opacity: 1,
      scale: 1,
      visibility: "visible",
      color: "var(--light-bg)",
      borderColor: "var(--light-bg)",
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{
      scale: 0.9,
      color: "var(--accent)",
      borderColor: "var(--accent)",
    }}
    transition={{ duration: 0.3 }}
    className="border-2 p-3 flex justify-center items-center text-2xl aspect-square rounded-full"
  >
    <FaPlus />
  </motion.button>
);
