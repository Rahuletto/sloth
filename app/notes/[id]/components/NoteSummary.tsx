import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkBreaks from 'remark-breaks'
import Code from "./Code";

import Gemini from "@/components/ui/Gemini";

export default function NoteSummary({
  note,
  focus,
}: {
  note: any;
  focus: boolean;
}) {

  return note.summary ? (
    <>
      {!focus && (
        <h2 className="md:text-4xl text-3xl decoration-wavy underline decoration-accent font-semibold font-mono">
          Summary
        </h2>
      )}
      <div id="summary" className="whitespace-break-spaces mx-4">
        <Markdown
          remarkPlugins={[remarkMath, remarkBreaks]}
          rehypePlugins={[rehypeKatex]}
          components={{ code: Code as any }}
        >
          {note.summary}
        </Markdown>
      </div>
    </>
  ) : (
    <div className="rounded-2xl bg-box border-2 border-bb px-4 py-3 h-72 flex gap-4 items-center justify-center w-full">
      <Gemini className="text-3xl "/>
      <h1 className="text-xl font-semibold">Generating Summary..</h1>
    </div>
  );
}
