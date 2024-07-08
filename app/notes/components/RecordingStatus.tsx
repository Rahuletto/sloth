import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function RecordingStatus({ status }: { status: string }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "recording") {
      setMessage("I'll transcribe it when the lecture ends.");
    } else if (status === "permission_denied") {
      setMessage(
        "Whoops. You threw away my mic. Grant me permission to record the lecture. (and reload)",
      );
    } else {
      setMessage(status);
    }
  }, [status]);

  return (
    <div className="flex absolute w-full left-0 top-[40dvh] items-center justify-center">
      <div className="flex flex-col gap-6">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:text-6xl md:text-5xl text-4xl font-mono font-semibold text-accent text-center"
        >
          Recording..
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="md:text-2xl text-lg font-semibold text-center"
        >
          {message}
        </motion.h1>
      </div>
    </div>
  );
}
