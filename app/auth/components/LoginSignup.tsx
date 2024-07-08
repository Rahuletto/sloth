"use client";

import React, { useState, useRef } from "react";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "@/firebase/auth";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

export default function LoginSignup() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mode, setMode] = useState<"login" | "signup" | "">("login");

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMode = (m: "login" | "signup") => {
    window.navigator.vibrate(10);
    const container = containerRef.current;
    if (!container) return;

    setPassword("");
    container.style.opacity = "0";

    setTimeout(() => {
      setMode("");
      container.style.opacity = "1";
      setTimeout(() => setMode(m), 500);
    }, 300);
  };

  const handleLogIn = () => {
    window.navigator.vibrate(10);
    signInWithEmail(email, password).catch((e) => {
      setError(e);
      console.warn(e);
    });
  };

  const handleSignUp = () => {
    window.navigator.vibrate(10);
    signUpWithEmail(email, password)
      .then(() => toggleMode("login"))
      .catch((e) => {
        setError(e);
        console.warn(e);
      });
  };

  let formComponent = null;
  
  if (mode === "login") {
    formComponent = (
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        handleLogIn={handleLogIn}
        signInWithGoogle={signInWithGoogle}
        toggleMode={toggleMode}
      />
    );
  } else if (mode === "signup") {
    formComponent = (
      <SignupForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        handleSignUp={handleSignUp}
        signInWithGoogle={signInWithGoogle}
        toggleMode={toggleMode}
      />
    );
  }
  
  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:w-[50%] w-full justify-center items-center mx-auto duration-300 transition-all animate-fade"
    >
      {formComponent}
    </div>
  );
}