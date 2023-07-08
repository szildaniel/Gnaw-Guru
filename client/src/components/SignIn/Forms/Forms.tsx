import LoginForm from "@/components/Login/LoginForm";
import { RegisterForm } from "@/components/RegisterForm/RegisterForm";
import React, { useState } from "react";
import { FormsSwitcher } from "./FormsSwitcher";
import "./styles.scss";

export type TForms = "login" | "register";

export const Forms = () => {
  const [activeForm, setActiveForm] = useState<TForms>("login");

  const switchForm = (formType: TForms) => {
    if (formType === activeForm) return;
    setActiveForm(formType);
  };
  return (
    <div className="sign-in-forms__container">
      <FormsSwitcher switchForm={switchForm} activeForm={activeForm} />
      {activeForm === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};
