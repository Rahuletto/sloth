"use client";

import React from "react";
import { motion } from "framer-motion";

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
        className="cursor-pointer w-fill md:w-fit overflow-hidden h-auto rounded-2xl flex flex-col justify-start items-start my-10"
      >
        <iframe name="youtube" title="Youtube Lecture" src={`http://www.youtube.com/embed/${  videoId}`} className="md:w-auto md:min-h-72 aspect-video rounded-2xl w-full" />
      </motion.div>
    )
  );
}
