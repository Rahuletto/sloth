import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "katex/dist/katex.min.css";

import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "sloth.",
  description: "Make your studying interesting with sloth.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
