import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import "./style.scss";
import { TRegisterForm } from "@/types/FormValuesType";
import axios, { isAxiosError } from "axios";
import { signIn } from "next-auth/react";
import useAsyncError from "../../../lib/hooks/useAsyncError";

export const RegisterForm = () => {
  const throwError = useAsyncError();

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .rule({ message: "Password must be between 6 and 20" })
      .required(),
    name: Joi.string().min(2).max(20).rule({ message: "Name must be between 2 and 20" }).required(),
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterForm>({ resolver: joiResolver(schema) });

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/register",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          callbackUrl: "/dashboard",
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        throwError(error);
      } else {
        throw new Error(
          "Error: You can't create account with this credentials. Try again with another different email and/or password."
        );
      }
    }
  });

  return (
    <div className="register-form__container">
      <form onSubmit={onSubmit}>
        <div className="login-form__input-container">
          <label>Name</label>
          <input {...register("name")} placeholder="Name" />
          {errors?.name && <p className="login-form__error-msg">{errors.name.message}</p>}
        </div>
        <div className="login-form__input-container">
          <label>Email</label>
          <input {...register("email")} placeholder="Email" />
          {errors?.email && <p className="login-form__error-msg">{errors.email.message}</p>}
        </div>
        <div className="login-form__input-container">
          <label>Password</label>
          <input type="password" placeholder="Password" {...register("password")} />
          {errors?.password && <p className="login-form__error-msg">{errors.password.message}</p>}
        </div>
        <input type="submit" value="Sign up" className="btn btn-secondary" />
      </form>
    </div>
  );
};
