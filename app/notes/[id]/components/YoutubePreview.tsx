"use client";

import { motion } from "framer-motion";
import React from "react";

import { useAuth } from "@/provider/UserProvider";

export default function YoutubePreview({ src }: { src: string }) {
  const user = useAuth();
  const videoIdMatch = src.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  return (
    user && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="animate-fade block cursor-pointer w-fill md:w-fit overflow-hidden h-auto rounded-2xl my-10 bg-box"
      >
        <iframe name="youtube" title="Youtube Lecture" src={`https://www.youtube.com/embed/${videoId}`} className="md:w-auto md:min-h-72 aspect-video rounded-2xl w-full" />
      </motion.div>
    )
  );
}
