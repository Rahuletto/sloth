import React, { useEffect, useRef, useState } from "react";

import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";

import Gemini from "@/components/ui/Gemini";
import { RiSpeakFill } from "react-icons/ri";
import { NoteData } from "@/types/NoteData";
import { FaPause, FaPlay } from "react-icons/fa6";
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
    const addSpansToWords = () => {
      const summaryElement = summaryRef.current;
      if (summaryElement) {
        const textNodes: Node[] = [];

        const getTextNodes = (node: Node) => {
          if (
            node.nodeType === Node.TEXT_NODE &&
            node.textContent?.trim() !== ""
          ) {
            textNodes.push(node);
          } else {
            node.childNodes.forEach(getTextNodes);
          }
        };

        getTextNodes(summaryElement);

        textNodes.forEach((textNode) => {
          const parentElement = textNode.parentNode;
          if (parentElement && parentElement.nodeName !== "SPAN") {
            const wordsAndSpaces = textNode.textContent?.split(/(\s+)/) || [];
            const fragment = document.createDocumentFragment();

            wordsAndSpaces.forEach((part) => {
              if (part.trim() !== "") {
                const wordSpan = document.createElement("span");
                wordSpan.className = "word";
                wordSpan.textContent = part;
                fragment.appendChild(wordSpan);
              } else {
                const spaceNode = document.createTextNode(part);
                fragment.appendChild(spaceNode);
              }
            });

            parentElement.replaceChild(fragment, textNode);
          }
        });
      }
    };

    addSpansToWords();
  }, [note.summary]);

  useEffect(() => {
    let i = -1;
    const words = document.querySelectorAll<HTMLSpanElement>("#summary .word");

    function onboundaryHandler() {
      if (words[i - 1]) {
        words[i - 1].classList.remove("highlight");
      }
      if (words[i]) {
        words[i].classList.add("highlight");
        i++;
      } else if (i === -1) {
        i++;
      }
    }

    if (note.summary && speaking) {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(note.summary);
      utterThis.rate = 1.02;
      synthesisRef.current = synth;
      utterThis.onboundary = onboundaryHandler;
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
          <h2 className="md:text-4xl text-3xl decoration-wavy underline decoration-accent font-semibold font-mono">
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
    </>
  ) : (
    <div className="rounded-2xl bg-box border-2 border-bb px-4 py-3 h-72 flex gap-4 items-center justify-center w-full">
      <Gemini className="text-3xl " />
      <h1 className="text-xl font-semibold">Generating Summary..</h1>
    </div>
  );
}
