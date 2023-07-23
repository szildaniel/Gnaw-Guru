"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import "./styles.scss";
import { useForm, Resolver } from "react-hook-form";

const LoginForm = () => {
  const [emailInput, setEmailInput] = useState<undefined | string>();
  const [passwordInput, setPasswordInput] = useState<undefined | string>();

  type FormValues = {
    email: string;
    password: string;
  };

  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.email ? values : {},
      errors: !values.password
        ? {
            email: {
              type: "required",
              message: "This is required.",
            },
          }
        : {},
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
  });

  return (
    <form onSubmit={onSubmit} className="login__form">
      <label>Name</label>
      <input {...register("email")} placeholder="Email" />
      {errors?.email && <p>{errors.email.message}</p>}
      <label>Password</label>
      <input type="password" placeholder="Password" {...register("password")} />
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
