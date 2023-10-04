"use client";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import useAsyncError from "../../../lib/hooks/useAsyncError";
import { TPWRequestForm } from "@/types/FormValuesType";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import Link from "next/link";

const ResetRequestForm = () => {
  const throwError = useAsyncError();
  const [resetLinkSended, setResetLinkSended] = useState(false);

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    resetPwRequest: Joi.boolean()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<TPWRequestForm>({ resolver: joiResolver(schema) });

 const onSubmit = handleSubmit(async ({ email }) => {
   try {
     const res = await axios.post(
       "http://localhost:8000/api/reset-password-request",
       {
         email: email,
         resetPwRequest: true
       },
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     if (res.status === 200) {
       setResetLinkSended(true);
       console.log(res)
     }
   } catch (error) {
     if (isAxiosError(error)) {
       throwError(error);
     } else {
       throw new Error(
         "Error: Invalid credentials try again later."
       );
     }
   }
 });


  return (
    <>
      <form onSubmit={onSubmit} className="reset__form">
        <div className="forms__input-container">
          <label>Email</label>
          <input
            {...register("email")}
            placeholder="Email"
            disabled={formState.isSubmitting || resetLinkSended}
          />
          {errors?.email && <p className="forms__error-msg">{errors.email.message}</p>}
          {resetLinkSended && (
            <p className="forms__success-msg">
              Success! Please go to your mailbox and click reset link.
            </p>
          )}
        </div>
        <div className="reset__btn-container">
          <input
            type="submit"
            value={resetLinkSended ? "Done" : "Next"}
            disabled={resetLinkSended}
            className="btn btn-secondary reset__submit"
          />
          <Link href="/auth/signIn" className="link reset__link">Go back</Link>
        </div>
      </form>
    </>
  );
}

export { ResetRequestForm };