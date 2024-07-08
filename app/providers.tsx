"use client";

import { ThemeProvider } from "@/provider/ThemeProvider";
import { UserProvider } from "@/provider/UserProvider";
import React, { ReactNode } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <svg width="0" height="0">
          <linearGradient id="gemini" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#1AA1E3" offset="0%" />
            <stop stopColor="#9168C0" offset="100%" />
          </linearGradient>
        </svg>
        {children}
      </UserProvider>
    </ThemeProvider>
  );
}
