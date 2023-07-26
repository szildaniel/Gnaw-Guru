"use client";
import React from "react";
import { signIn } from "next-auth/react";
import "./styles.scss";
import { useForm, Resolver } from "react-hook-form";
import { Button } from "../Button/Button";
import GoogleIcon from "../../assets/icons/google-icon.svg";
import GithubIcon from "../../assets/icons/github-icon.svg";


const LoginForm = () => {
  type FormValues = {
    email: string;
    password: string;
  };


  
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

   const handleGithubLogin = () => {
     signIn("github", { callbackUrl: "/" });
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
    <>
      <form onSubmit={onSubmit} className="login__form">
        <label>Email</label>
        <input {...register("email")} placeholder="Email" />
        {errors?.email && <p>{errors.email.message}</p>}
        <label>Password</label>
        <input type="password" placeholder="Password" {...register("password")} />
        <input type="submit" value="Login" className="btn btn-secondary" />
        <Button
          textCentered={true}
          text="Sign in with Google"
          type="icon-transparent"
          onClick={handleGoogleLogin}
          Icon={GoogleIcon}
        />
        <Button
          textCentered={true}
          text="Sign in with Github"
          type="icon-transparent"
          onClick={handleGithubLogin}
          Icon={GithubIcon}
        />
      </form>
    </>
  );
};

export default LoginForm;
