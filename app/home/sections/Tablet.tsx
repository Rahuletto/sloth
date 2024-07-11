import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ContainerScroll = dynamic(
    () =>
      import("@/components/ui/ContainerScroll").then(
        (mod) => mod.ContainerScroll,
      ),
    { ssr: false },
  );

  

export default function Tablet() {
  return (
    <section id="tablet" className="z-10 transition-all animate-fade duration-300">
      <ContainerScroll
        titleComponent={
          <h1 className="md:text-7xl text-5xl font-semibold text-center">
            Learn, Flash, Ace.
          </h1>
        }
      >
        <Image
          src="/images/sloth.png"
          alt="hero"
          height={720}
          width={1400}
          className="md:block hidden mx-auto rounded-2xl object-cover saturate-150 h-full object-left-top"
          draggable={false}
        />

        <Image
          src="/images/sloth-mobile.png"
          alt="hero"
          height={1280}
          width={720}
          className="md:hidden mx-auto rounded-2xl object-cover saturate-150 h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
