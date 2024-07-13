import React from "react";
import { Input } from "@/components/ui/Input";
import { FaArrowRight, FaGoogle } from "react-icons/fa6";
import { Link } from "next-view-transitions";
import type { FormProps } from "./Props";

export default function SignupForm({
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleSignUp,
  signInWithGoogle,
  toggleMode,
}: FormProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold">Let&apos;s get a note</h1>
      <p>Welcome to the party. Let&apos;s get started.</p>
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
          <Input
            id="password"
            placeholder="Passw*rd"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSignUp}
            title="Signup"
            type="submit"
            disabled={!email || !password}
            className={`${password && email
                ? "opacity-100 active:gap-24 active:scale-95 cursor-pointer"
                : "opacity-60 cursor-not-allowed"
              } w-[100%] bg-accent rounded-full text-lg hover:gap-6 transition-all duration-300 text-bg font-semibold py-4 flex items-center gap-3 px-6`}
            tabIndex={0}
          >
            Sign up <FaArrowRight />
          </button>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className="bg-gradient-to-l from-accent to-transparent my-8 h-[1px] w-full" />
          <p className="text-xs text-accent">OR</p>
          <div className="bg-gradient-to-r from-accent  to-transparent my-8 h-[1px] w-full" />
        </div>
        <button
          type="button"
          title="Signup with Google"
          onClick={() => signInWithGoogle()}
          className="opacity-100 active:md:gap-24 active:gap-8 active:scale-95 cursor-pointer w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white rounded-full text-lg hover:gap-6 transition-all duration-300 text-bg font-semibold py-4 flex items-center gap-3 px-6"
          tabIndex={0}
        >
          <FaGoogle /> Signup with Google
        </button>
      </div>
      <p className="text-color font-regular text-lg mt-3">
        <span className="opacity-70">Already have notes? </span>{" "}
        <button
          type="button"
          onClick={() => toggleMode("login")}
          className="text-accent py-2 hover:opacity-100 hover:mx-6 transition-all duration-300 hover:px-8 hover:bg-accent hover:text-bg hover:font-semibold rounded-full "
        >
          Log in
        </button>
      </p>
      <p className="opacity-30 text-xs text-color text-center mt-8">
        By using sloth, you agree to our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </>
  );
}
