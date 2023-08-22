"use client";
import React from "react";
import { Doctors } from "@/components/Doctors";
import { AppBar } from "@/components/AppBar";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Home() {
  // const queryClient = new QueryClient();
   const { data: session, status } = useSession();
  if(status == 'unauthenticated') throw new Error('Only for logged in users.')
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
