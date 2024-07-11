"use client";

import dynamic from "next/dynamic";
import React from "react";

const Hero = dynamic(
  () => import("./sections/Hero").then((mod) => mod.default),
  { ssr: true },
);

const Features = dynamic(
  () => import("./sections/Features").then((mod) => mod.default),
  { ssr: true },
);

const Tablet = dynamic(
  () => import("./sections/Tablet").then((mod) => mod.default),
  { ssr: false },
);

const ThingsDo = dynamic(
  () => import("./sections/ThingsDo").then((mod) => mod.default),
  { ssr: false },
);

const Gemini = dynamic(
  () => import("./sections/Gemini").then((mod) => mod.default),
  { ssr: false },
);

const Footer = dynamic(
  () => import("./sections/Footer").then((mod) => mod.default),
  { ssr: false },
);

export default function Home() {
  return (
    <>
    <div id="home" className="fixed top-0 left-0 h-screen w-screen z-0" />
    <main className="z-10 bg-transparent min-h-screen lg:px-32 lg:py-48 md:px-28 md:py-32 px-12 py-20 pb-48">
      <Hero />
      <Features />
      <Tablet />
      <ThingsDo />
      <Footer />
      <Gemini />
    </main>
    </>
  );
}
