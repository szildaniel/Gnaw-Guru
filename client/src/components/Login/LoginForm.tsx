"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import "./styles.scss";

const LoginForm = () => {
  const [emailInput, setEmailInput] = useState<undefined | string>();
  const [passwordInput, setPasswordInput] = useState<undefined | string>();

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: emailInput,
      password: passwordInput,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="login__container">
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => {
          setEmailInput(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
      />

      <button onClick={onSubmit}>Login</button>
    </div>
  );
};

export default LoginForm;
