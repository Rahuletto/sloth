"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useAuth } from "@/provider/UserProvider";

export default function PDFPreview({ src }: { src: string }) {
  const user = useAuth();

  return (
    user && (
      <motion.a
        href={src}
        target="_blank"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`cursor-pointer overflow-hidden w-fit h-auto rounded-2xl flex flex-col justify-start items-start my-10`}
      >
        <div className="items-center w-full flex justify-between">
          <iframe src={src} className="aspect-video rounded-2xl" />
        </div>
        <div className="px-6 py-2">
          <h2 className="text-md sm:text-lg font-mono opacity-80 font-semibold">
            {decodeURIComponent(
              src.split("/pdf%2F")[1].split(".pdf")[0].split("_").slice(1).join()
            )}
            .pdf
          </h2>
        </div>
      </motion.a>
    )
  );
}
