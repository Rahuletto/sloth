import React from "react";
import { IoCloudOffline } from "react-icons/io5";

export default function Offline() {
  return (
    <div
      id="home"
      className="bg-opacity-35 w-screen h-screen flex flex-col gap-6 justify-center items-center mx-auto duration-300 transition-all animate-fade"
    >
      <h1 className="text-accent opacity-100 font-bold font-mono text-9xl flex">
       <IoCloudOffline />
      </h1>
      <h2 className="font-sans md:text-2xl text-lg font-semibold">
        You are <span className="text-accent">offline.</span> Let&apos;s resume after we are online.
      </h2>
    </div>
  );
}
