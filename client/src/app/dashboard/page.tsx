"use client";
import "./styles.scss";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="dashboard__container">
        <h1>Dashboard page coming soon</h1>
        <h2>Hello {session?.user.name}</h2>
        <h3>This is worth waiting for.</h3>
        <div className="dashboard__link-container">
          Go back to{" "}
          <Link className="dashboard__link" href="/auth/signIn">
            Login Page
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
