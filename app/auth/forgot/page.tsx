"use client";

import { Input } from "@/components/ui/Input";
import { forgotPassword } from "@/firebase/auth";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function Forgot() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleForget = () => {
    window.navigator.vibrate(10)
    const mail = email.trim();
    setEmail('')
    forgotPassword(mail)
      .then(() => {
        setEmail("");
        setError("success");
      })
      .catch((e) => {
        setError(e);
        console.warn(e);
      });
  };
  return (
    <main className="w-screen h-screen flex items-center justify-center duration-300 transition-all animate-fade">
      {error === "success" ? (
        <div
          id="forgot"
          className="flex flex-col lg:w-[50%] w-full justify-center items-center mx-auto duration-300 transition-all animate-fade"
        >
          <h1 className="text-2xl font-semibold">Check your email</h1>
          <p>
            We have sent a magic link to your email. Click on it to reset your
            password.
          </p>
        </div>
      ) : (
        <div
          id="forgot"
          className="flex flex-col lg:w-[50%] w-full justify-center items-center mx-auto duration-300 transition-all animate-fade"
        >
          <h1 className="text-2xl font-semibold">You forgot it?</h1>
          <p>
            Don&apos;t worry. Enter your email and we&apos;ll send you a magic
            link.
          </p>
          {error && (
            <div className="mt-4 bg-accent text-bg font-semibold shadow-2xl shadow-accent px-6 py-2 rounded-full">
              {error}
            </div>
          )}
          <div className="md:p-6 mt-2 flex flex-col gap-6 max-w-[500px] md:w-[60%] w-[80%]">
            <div className="flex flex-col gap-2">
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleForget}
                title="Forgot password"
                type="submit"
                disabled={!email}
                className={`${
                  email
                    ? "opacity-100 active:gap-24 active:scale-95 cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                } w-[100%] bg-accent rounded-full text-lg hover:gap-6 transition-all duration-300 text-bg font-semibold py-4 flex items-center gap-3 px-6`}
                tabIndex={0}
              >
                Start recovery <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
