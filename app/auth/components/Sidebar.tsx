import React, { ReactNode } from "react";
import { PiCardsThreeDuotone, PiVinylRecordBold } from "react-icons/pi";
import { TbMessageQuestion } from "react-icons/tb";
import { RiScissorsCutFill } from "react-icons/ri";
import Image from "next/image";

function Feature({ text, children }: { text: string; children: ReactNode }) {
  return (
    <div className="items-center flex gap-2 opacity-60">
      {children}
      <h3 className="text-md font-mono">{text}</h3>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div
      className="relative w-[50%] lg:flex h-full rounded-3xl hidden bg-box flex-col border-alt border-2 backdrop-blur-xl p-12 justify-between duration-300 transition-all"
      id="side"
    >
      <div className="flex flex-col justify-start items-start gap-6">
        <h1 className="font-semibold text-2xl">sloth.</h1>
        <h2 className="font-bold text-6xl max-w-[80%]">
          Study smart, effortlessly.
        </h2>
        <div className="flex flex-wrap gap-12 flex-row mt-6">
          <Feature text="Record lectures">
            <PiVinylRecordBold />
          </Feature>
          <Feature text="Summarize">
            <RiScissorsCutFill />
          </Feature>
          <Feature text="Flash cards">
            <PiCardsThreeDuotone />
          </Feature>
          <Feature text="Quiz">
            <TbMessageQuestion />
          </Feature>
        </div>
      </div>
      <Image
        className="rotate-12 absolute right-48 bottom-72 opacity-50 select-none"
        alt="smiley"
        src="/smiley.svg"
        width={200}
        height={200}
      />
      <p className="opacity-40">
        Forget the old grind, I&apos;ll help you with this game.
      </p>
    </div>
  );
}
