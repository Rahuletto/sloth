/** eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from "react";

import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";

import Gemini from "@/components/ui/Gemini";
import type { NoteData } from "@/types/NoteData";
import { FaPause, FaPlay } from "react-icons/fa6";
import { RiSpeakFill } from "react-icons/ri";
import Code from "./Code";

export default function NoteSummary({
  note,
  focus,
}: {
  note: NoteData;
  focus: boolean;
}) {
  const [speaking, setSpeaking] = useState(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (speaking) {
      summaryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (note.summary && speaking) {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(note.summary);
      utterThis.rate = 1.02;
      synthesisRef.current = synth;
      synth.speak(utterThis);
    }
  }, [speaking, note]);

  useEffect(() => {
    if (synthesisRef.current) {
      if (!speaking) {
        synthesisRef.current.pause();
      } else {
        synthesisRef.current.resume();
      }
    }
  }, [synthesisRef, speaking]);

  return note.summary ? (
    <>
      {!focus && (
        <div className="flex justify-between items-center animate-fade duration-200 transition-all">
          <h2
            className="md:text-4xl text-3xl underline decoration-accent font-semibold font-mono"
            style={{ textDecorationSkipInk: "none" }}
          >
            Summary
          </h2>
          <button
            type="button"
            // eslint-disable-next-line jsx-a11y/tabindex-no-positive
            tabIndex={1}
            onClick={() => setSpeaking((prev) => !prev)}
            title="Speak summary"
            className="p-3 px-5 flex gap-3 text-xl h-fit dark:bg-[rgba(255,255,255,0.1)] font-medium bg-[rgba(0,0,0,0.1)] rounded-lg transition-all duration-300"
          >
            {speaking || synthesisRef.current ? (
              <RiSpeakFill className="opacity-40" />
            ) : null}
            {/* eslint-disable-next-line no-nested-ternary */}
            {speaking ? (
              <FaPause />
            ) : synthesisRef.current ? (
              <FaPlay />
            ) : (
              <RiSpeakFill />
            )}
          </button>
        </div>
      )}

      <div
        ref={summaryRef}
        id="summary"
        className="whitespace-break-spaces mx-4"
      >
        <Markdown
          remarkPlugins={[remarkMath, remarkBreaks]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code: Code as any,
          }}
        >
          {note.summary}
        </Markdown>
      </div>
      <p className="opacity-40 text-xs text-color text-center flex w-full">sloth. uses Gemini, Gemini may display inaccurate info. So double-check its summary.</p>
    </>
  ) : (
    <div className="rounded-2xl bg-box border-2 border-bb px-4 py-3 h-72 flex gap-4 items-center justify-center w-full">
      <Gemini className="text-3xl " />
      <h1 className="text-xl font-semibold">Generating Summary..</h1>
    </div>
  );
}
