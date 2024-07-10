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
        className="lg:mt-32 mt-24 flex flex-col items-center justify-center lg:gap-24 md:gap-12 gap-4 transition-all animate-fade duration-300"
      >
        <h1 className="md:text-5xl text-2xl font-semibold text-center">
          What can i do?
        </h1>

        <Bento />
      </section>
  )
}
