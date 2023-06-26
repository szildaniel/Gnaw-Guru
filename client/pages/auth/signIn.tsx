import React from "react";
import { Inter } from "next/font/google";
import { SignInContainer } from "@/components/SignIn/SignInContainer";
import { Hero } from "@/components/SignIn/Hero/Hero";
import { Forms } from "@/components/SignIn/Forms/Forms";
import "../../src/scss/global.scss";

const inter = Inter({ subsets: ["latin"] });
const signIn = () => {
  return (
    <main className={inter.className}>
      <SignInContainer>
        <Hero />
        <Forms />
      </SignInContainer>
    </main>
  );
};

export default signIn;
