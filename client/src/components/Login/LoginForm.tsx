"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { Button } from "../Button/Button";
import GoogleIcon from "../../assets/icons/google-icon.svg";
import GithubIcon from "../../assets/icons/github-icon.svg";
import { TLoginForm } from "@/types/FormValuesType";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import useAsyncError from "../../../lib/hooks/useAsyncError";
import { useRouter } from "next/router";
import { TForms } from "../SignIn/Forms/Forms";
import Link from "next/link";

type SwitcherFunction = (switchType: TForms) => void;

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .rule({ message: "Password must be between 6 and 20" })
    .required(),
});

const LoginForm = ({
  switchForm,
  activeForm,
  isCollapsed,
}: {
  switchForm: SwitcherFunction;
  activeForm: TForms;
  isCollapsed: boolean;
}) => {
  const throwError = useAsyncError();

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGithubLogin = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({ resolver: joiResolver(schema) });
  const router = useRouter();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      // callbackUrl: "/"
    });
    if (result?.error) {
      throwError(new Error("Sorry, wrong credentials."));
    } else {
      router.push("/dashboard");
    }
  });

  return (
    <div className={`login-form__container ${isCollapsed ? "mobile-collapsed" : ""}`}>
      <form onSubmit={onSubmit}>
        <div className="login-form__input-container">
          <label>Email</label>
          <input
            {...register("email")}
            placeholder="Email"
            className={errors?.email && "invalid"}
          />
          {errors?.email && <p className="login-form__error-msg">{errors.email.message}</p>}
        </div>
        <div className="login-form__input-container">
          <label className="login-form__pw-label">
            Password
            <Link className="link login-form__reset-link" href="/reset-password-request">
              Forgot password?
            </Link>
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={errors?.password && "invalid"}
          />
          {errors?.password && <p className="login-form__error-msg">{errors.password.message}</p>}
        </div>
        <span className="forms__helper-text">
          Don&apos;t have account?{" "}
          <button className="forms__int-link" onClick={() => switchForm("register")}>
            Register
          </button>
        </span>
        <input type="submit" value="Login" className="btn btn-secondary" />
      </form>
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
    </div>
  );
};

export default LoginForm;
