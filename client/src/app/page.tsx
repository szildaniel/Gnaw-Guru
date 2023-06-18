"use client";
import React, { useState } from "react";
import { Doctors } from "@/components/Doctors";
import LoginForm from "@/components/Login/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const queryClient = new QueryClient();
  return (
    <main>
      <h1>Gnaw Guru</h1>
      <QueryClientProvider client={queryClient}>
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn ? <h2>USER LOGGED IN</h2> : <h2>USER NOT LOGGED IN</h2>}
      </QueryClientProvider>
    </main>
  );
}
