import React from "react";

export default function Verify() {
  return (
    <main className="w-screen h-screen flex items-center justify-center duration-300 transition-all animate-fade">
      <div
        id="forgot"
        className="flex flex-col lg:w-[50%] w-full justify-center items-center mx-auto duration-300 transition-all animate-fade"
      >
        <h1 className="text-xl text-center mx-6 font-semibold">Check your email, we sent a verification link.</h1>
      </div>
    </main>
  );
}
