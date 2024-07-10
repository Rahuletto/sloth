"use client";

import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import React from "react";

export default function NotFoundError() {
  return (
    <div
      id="side"
      className="bg-opacity-35 w-screen h-screen flex flex-col gap-6 justify-center items-center mx-auto duration-300 transition-all animate-fade"
    >
      <h1 style={{ fontFamily: 'var(--mono)'}} className="text-accent opacity-100 font-bold font-mono text-9xl flex">
        <motion.div
          initial={{ rotate: 0 }}
          transition={{ duration: 0.3, delay: 2, type: "spring", bounce: 0.2  }}
          animate={{ rotate: -24 }}
        >
          4
        </motion.div>
        <motion.div
          initial={{ rotate: 0, translateY: 0 }}
          transition={{ duration: 0.1, delay: 2.1, type: "spring", bounce: 0.8  }}
          animate={{ translateY: 3, rotate: 8 }}
        >
          0
        </motion.div>
        <motion.div
          initial={{ rotate: 0 }}
          transition={{ duration: 0.5, delay: 1.8, type: "spring", bounce: 0.5 }}
          animate={{ rotate: 48 }}
        >
          4
        </motion.div>
      </h1>
      <h2 className="font-sans md:text-2xl text-lg font-semibold">
        You <span className="text-accent">lost</span> track.. You aren&apos;t supposed to be here
      </h2>
      <Link href="/" className="font-sans text-xl font-semibold bg-accent text-bg rounded-full px-8 py-4">Step back</Link>
    </div>
  );
}
