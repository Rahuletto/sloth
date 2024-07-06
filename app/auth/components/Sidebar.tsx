import { ReactNode } from "react";
import { PiCardsThreeDuotone, PiVinylRecordBold } from "react-icons/pi";
import { TbMessageQuestion } from "react-icons/tb";
import { RiScissorsCutFill } from "react-icons/ri";

export default function Sidebar() {
  return (
    <div className="w-[50%] lg:flex h-full rounded-3xl hidden bg-box flex-col border-alt border-2 backdrop-blur-xl p-12 justify-between duration-300 transition-all" id="side">
      <div className="flex flex-col justify-start items-start gap-6">
        <h1 className="font-semibold text-2xl">sloth.</h1>
        <h2 className="font-bold text-6xl max-w-[80%]">
          Study smart, effortlessly.
        </h2>
        <div className="flex flex-wrap gap-12 flex-row mt-6">
          <Feature text="Flash cards">
            <PiCardsThreeDuotone />
          </Feature>
          <Feature text="Quiz">
            <TbMessageQuestion />
          </Feature>
          <Feature text="Summarize">
            <RiScissorsCutFill />
          </Feature>
          <Feature text="Record lectures">
            <PiVinylRecordBold />
          </Feature>
        </div>
      </div>
      <p className="opacity-40">
        Forget the old grind, I{"'"}ll help you with this game.
      </p>
    </div>
  );
}

function Feature({ text, children }: { text: string; children: ReactNode }) {
    return (
      <div className="items-center flex gap-2 opacity-60">
        {children}
        <h3 className="text-md font-mono">{text}</h3>
      </div>
    );
  }