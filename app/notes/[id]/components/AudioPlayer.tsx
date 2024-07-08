"use client";

import { convertTime } from "@/utils/convertTime";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaXmark } from "react-icons/fa6";
import { TbRewindBackward15, TbRewindForward15 } from "react-icons/tb";
import { CgTranscript } from "react-icons/cg";
import { motion } from "framer-motion";
import { formatText } from "@/utils/formatText";

export default function AudioPlayer({
  src,
  transcript,
}: {
  src: string;
  transcript: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState("00:00");
  const [transcriptToggle, setTranscriptToggle] = useState(false);
  const [playback, setPlayback] = useState(false);

  function handlePlayback() {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setPlayback(true);
    } else {
      audioRef.current?.pause();
      setPlayback(false);
    }
  }

  function handleRewind() {
    if (audioRef.current) audioRef.current.currentTime -= 15;
  }

  function handleForward() {
    if (audioRef.current) audioRef.current.currentTime += 15;
  }

  function onUpdate() {
    if (audioRef.current) setTime(convertTime(audioRef.current.currentTime));
  }

  useEffect(() => {
    if (audioRef.current) {
      setTime(convertTime(audioRef.current.currentTime));
      audioRef.current.addEventListener("timeupdate", onUpdate);
    }
  }, [audioRef]);

  return (
    <motion.div
      initial={{ height: "80px" }}
      animate={{ height: transcriptToggle ? "100%" : "80px" }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden min-h-[78px] max-w-[700px] bg-box border-2 border-bb rounded-2xl flex flex-col justify-start items-start px-6 py-3 mb-10"
    >
      <div className="items-center w-full h-[50px] flex justify-between">
        <audio
          preload="meta"
          ref={audioRef}
          src={src}
          controls
          className="hidden"
        >
          <track kind="captions" label="Captions" />
        </audio>
        <div>
          <h2 className="text-md sm:text-xl font-semibold">Lecture</h2>
          <p className="font-mono text-xs sm:text-base">
            <span className="opacity-50">{time}</span>{" "}
            {audioRef.current?.src && audioRef.current.duration && (
              <>| {convertTime(audioRef.current.duration)}</>
            )}
          </p>
        </div>

        <div className="flex gap-4 items-center justify-center scale-75 sm:scale-100 origin-right transition-all duration-300">
          <div id="controls" className="flex gap-2 opacity-80">
            <button
              type="button"
              aria-label="rewind"
              className="p-2 hover:scale-105 active:scale-90 transition-all duration-300"
              onClick={handleRewind}
            >
              <TbRewindBackward15 className="text-xl" />
            </button>
            <button
              type="button"
              aria-label={playback ? "pause" : "play"}
              className="p-3 hover:scale-105 active:scale-90 transition-all duration-300"
              onClick={handlePlayback}
            >
              {!playback ? (
                <FaPlay className="text-3xl" />
              ) : (
                <FaPause className="text-3xl" />
              )}
            </button>
            <button
              type="button"
              aria-label="forward"
              className="p-2 hover:scale-105 active:scale-90 transition-all duration-300"
              onClick={handleForward}
            >
              <TbRewindForward15 className="text-xl" />
            </button>
          </div>
          <div className="h-[30px] my-auto w-0.5 rounded-3xl bg-color opacity-70" />
          <button
            type="button"
            aria-label="transcript"
            onClick={() => setTranscriptToggle((prev) => !prev)}
            className="font-mono px-4 py-2 rounded-lg dark:bg-[rgba(255,255,255,0.1)] font-medium bg-[rgba(0,0,0,0.1)] opacity-90 flex gap-3 h-min items-center"
          >
            {transcriptToggle ? <FaXmark /> : <CgTranscript />}
          </button>
        </div>
      </div>
      <p className="opacity-85 text-md py-4 whitespace-break-spaces text-justify">
        {formatText(transcript)}
      </p>
    </motion.div>
  );
}
