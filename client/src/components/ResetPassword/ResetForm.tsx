"use client";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import useAsyncError from "../../../lib/hooks/useAsyncError";
import { TPWForm, TResetFormProps } from "@/types/FormValuesType";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import Link from "next/link";

const ResetForm = ({ id, token }: TResetFormProps) => {
  const throwError = useAsyncError();
  const [passwordChanged, setPasswordChanged] = useState(false);

  const schema = Joi.object({
    password: Joi.string()
      .min(6)
      .max(20)
      .rule({ message: "Password must be between 6 and 20" })
      .required(),
    token: Joi.string().required(),
    userId: Joi.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<TPWForm>({ resolver: joiResolver(schema) });

  const onSubmit = handleSubmit(async ({ password, userId, token }) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/reset-password",
        {
          userId: userId,
          newPassword: password,
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setPasswordChanged(true);
        console.log(res);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        throwError(error);
      } else {
        throw new Error("Error: Invalid credentials try again later.");
      }
    }
  });

  return (
    <>
      <form onSubmit={onSubmit} className="reset__form">
        <div className="forms__input-container">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="New password"
            disabled={formState.isSubmitting || passwordChanged}
          />
          <input type="hidden" {...register("token")} value={token ? token : ""} />
          <input type="hidden" {...register("userId")} value={id ? id : ""} />
          {errors?.password && <p className="forms__error-msg">{errors.password.message}</p>}
          {passwordChanged && (
            <p className="forms__success-msg">Your password has been successfully reset.</p>
          )}
        </div>
        <div className="reset__btn-container">
          {passwordChanged ? (
            <button className="btn btn-secondary reset__submit">
              <Link href="/auth/signIn">Login</Link>
            </button>
          ) : (
            <input
              type="submit"
              value="Next"
              disabled={passwordChanged}
              className="btn btn-secondary reset__submit"
            />
          )}

          <Link href="/auth/signIn" className="link reset__link">
            Go back
          </Link>
        </div>
      </form>
    </>
  );
};

export { ResetForm };
