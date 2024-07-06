import { motion } from "framer-motion";

export const RecordingStatus = ({ status }: { status: string }) => (
    <div className="flex absolute w-full left-0 top-[40vh] items-center justify-center">
      <div className="flex flex-col gap-6">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-6xl font-mono font-semibold text-accent text-center"
        >
          Recording..
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="text-2xl font-semibold text-center"
        >
          {status === "recording"
            ? "I'll transcribe it when the lecture ends."
            : status === "permission_denied"
            ? "Whoops. You threw away my mic. Grant me permission to record the lecture. (and reload)"
            : "Getting ready.."}
        </motion.h1>
      </div>
    </div>
  );