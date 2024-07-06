"use client";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { UserProvider } from "@/provider/UserProvider";
import { ReactNode } from "react";
import 'regenerator-runtime/runtime'

export default function Providers({ children }: { children: ReactNode }) {
  return (<ThemeProvider><UserProvider>{children}</UserProvider></ThemeProvider>);
}
