import { Link } from 'next-view-transitions'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <section id="footer" className="lg:mt-32 mt-24 transition-all animate-fade delay-2000 duration-300">
        <h2 className="lg:text-5xl md:text-3xl text-xl font-semibold lg:max-w-[50%]">
          Never waste time reading through endless details again.
        </h2>

        <div className='flex items-center justify-center w-full gap-3 mt-24 flex-col'>
          <Image src="/marban.svg" alt="Marban" width={40} height={40} />
          <p className="text-lg font-semibold ml-2 text-center">
            made by <Link target='_blank' href="https://marban.is-a.dev" className='font-semibold text-[#D6BFB2]'>marban.</Link>
          </p>
        </div>
      </section>
  )
}
