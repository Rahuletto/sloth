"use client";

import { motion } from "framer-motion";
import React from "react";
import { SiGooglegemini } from "react-icons/si";

export default function Gemini({ className }: { className?: string }) {
  return (
    <motion.p
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        delay: 0.5,
        type: "spring",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        ease: 'easeInOut'
      }}
    >
      <SiGooglegemini
        className={`animate-geminiSpin transition-all ${className} `}
        style={{ fill: "url(#gemini)" }}
      />
    </motion.p>
  );
}
