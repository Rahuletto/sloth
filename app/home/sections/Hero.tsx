import React from 'react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'

export default function Hero() {
  return (
    <section id="hero" className="z-10 relative flex justify-between transition-all animate-fade duration-300">
    <div className="flex gap-6 flex-col">
      <Image alt="sloth" src="/raw-smile.svg" width={44} height={44} />
      <div className="flex gap-3 flex-col max-w-[60%]">
        <h1 className="font-bold lg:text-7xl md:text-5xl text-3xl">
          Study smart, effortlessly.
        </h1>
        <p className="opacity-40 md:text-xl text-lg font-medium">
          I&apos;ll listen to your lectures and write detailed notes,
          flashcards, and quizzes.
        </p>
        <div className="flex gap-3 mt-3">
          <Link
            href="/auth"
            className="px-6 py-4 text-lg font-semibold rounded-full bg-accent text-bg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
    <Image
      className="hidden lg:block rotate-12 absolute right-32 mt-20"
      alt="sloth"
      src="/smiley.svg"
      width={250}
      height={250}
    />
  </section>
  )
}
