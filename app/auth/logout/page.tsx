"use client";
import { logOut } from "@/firebase/auth";
import { useAuth } from "@/provider/UserProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (user !== null) {
      logOut().then(() => {
        router.push("/auth");
      });
    }
  }, [user, router]);

  return (
    <div
      id="logout"
      className="h-screen flex flex-col lg:w-[50%] w-full justify-center items-center mx-auto duration-300 transition-all animate-fade"
    >
      <h1 className="text-2xl font-semibold">Logging out.</h1>
    </div>
  );
}
