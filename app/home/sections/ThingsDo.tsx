import dynamic from 'next/dynamic';
import React from 'react'

const Bento = dynamic(
  () => import("@/components/ui/Bento").then((mod) => mod.default),
  { ssr: false },
);

export default function ThingsDo() {
  return (
    <section
        id="i-do"
        className="z-20 lg:mt-32 mt-24 flex flex-col items-center justify-center lg:gap-24 md:gap-12 gap-4 transition-all animate-fade duration-300"
      >
        <h1 className="z-10 md:text-5xl text-2xl font-semibold text-center">
          What can i do?
        </h1>

        <Bento />

        <p className="z-10 lg:text-5xl md:text-3xl text-xl font-semibold text-center lg:max-w-[50%] mt-24">
          Never waste time reading through endless details again.
        </p>
      </section>
  )
}
