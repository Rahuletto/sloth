'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/UserProvider";
import Loader from "@/components/ui/Loader";
import React from "react";

export default function Index() {
  const router = useRouter();
  const user = useAuth();

  if (user) {
    router.push("/notes");
  } else if (user === false) {
    router.push("/home");
  }
  return <Loader />;
}
