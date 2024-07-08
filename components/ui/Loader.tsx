import React from 'react'
import { RiLoaderLine } from 'react-icons/ri'


export default function Loader() {
  return (
    <div
      id="loading"
      className="h-screen flex flex-col lg:w-[50%] w-full gap-6 justify-center items-center mx-auto"
    >
      <RiLoaderLine className="text-accent opacity-90 animate-spin text-6xl transition-all" />
      <h1 className="text-2xl font-semibold">Loading..</h1>
    </div>
  )
}
