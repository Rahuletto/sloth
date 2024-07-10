"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";

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

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
        } else {
          (entry.target as HTMLElement).style.opacity = "0";
        }
      });
    });

    const sections = document.getElementsByTagName("section");

    if (sections) {
      Array.from(sections).forEach((section) => {
        observer.observe(section);
      });
    }

    return () => {
      if (sections) {
        Array.from(sections).forEach((section) => {
          observer.unobserve(section);
        });
      }
    };
  }, []);

  return (
    <main
      className="min-h-screen lg:px-32 lg:py-48 md:px-28 md:py-32 px-12 py-20 pb-48"
      id="home"
    >
      <Hero />
      <Features />
      <Tablet />
      <ThingsDo />
      <section id="more" className="lg:mt-32 mt-24 transition-all animate-fade duration-300">
        <h2 className="lg:text-5xl md:text-3xl text-xl font-semibold lg:max-w-[50%]">
          Never waste time reading through endless details again.
        </h2>
      </section>
      <Gemini />
    </main>
  );
}