"use client";

import { motion } from "framer-motion";
import React from "react";

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
        className="animate-fade cursor-pointer overflow-hidden w-fit h-auto rounded-2xl flex flex-col justify-start items-start my-10"
        rel="noreferrer"
      >
        <div className="items-center w-full flex justify-between">
          <iframe
            name="pdf"
            title={decodeURIComponent(
              src
                .split("/pdf%2F")[1]
                .split(".pdf")[0]
                .split("_")
                .slice(1)
                .join(),
            )}
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
            className="aspect-video rounded-2xl"
          />
        </div>
        <div className="px-6 py-2">
          <h2 className="text-md sm:text-lg font-mono opacity-80 font-semibold">
            {decodeURIComponent(
              src
                .split("/pdf%2F")[1]
                .split(".pdf")[0]
                .split("_")
                .slice(1)
                .join(),
            )}
            .pdf
          </h2>
        </div>
      </motion.a>
    )
  );
}
