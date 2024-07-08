"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/UserProvider";
import Loader from "@/components/ui/Loader";
import { User } from "firebase/auth";
import LoginSignup from "./LoginSignup";
import Sidebar from "./Sidebar";

export default function AuthWrapper() {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if ((user !== null || user !== false) && (user as User)?.email)
      router.push("/notes");
  }, [user, router]);

  if (user === null) return <Loader />;

  return (
    <main
      className={`w-screen h-screen flex gap-0 p-4 duration-300 transition-all animate-fade ${
        user !== false ? "opacity-0" : "opacity-100"
      }`}
    >
      {user === false && (
        <>
          <Sidebar />
          <LoginSignup />
        </>
      )}
    </main>
  );
}
