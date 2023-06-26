"use client";
import "../scss/global.scss";
import { Inter } from "next/font/google";
import { Provider } from "./Provider";
import { AppBar } from "@/components/AppBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gnaw Guru - take care of your smile.",
  description: "Gnaw guru descriptions goes here.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
