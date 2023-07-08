"use client";
import React from "react";
import { Doctors } from "@/components/Doctors";
import { AppBar } from "@/components/AppBar";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  // const queryClient = new QueryClient();
  return (
    <>
      <AppBar />
      <main>
        <h1 className="main-heading">Gnaw Guru</h1>
        {/* <QueryClientProvider client={queryClient}> */}
        {/* </QueryClientProvider> */}
        {/* <Doctors /> */}
      </main>
    </>
  );
}
