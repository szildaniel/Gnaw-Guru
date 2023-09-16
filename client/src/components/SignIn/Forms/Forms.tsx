import LoginForm from "@/components/Login/LoginForm";
import { RegisterForm } from "@/components/RegisterForm/RegisterForm";
import React, { useState } from "react";
import { FormsSwitcher } from "./FormsSwitcher";
import { LoginHeader } from "./LoginHeader";
import { RegisterHeader } from './RegisterHeader';
import "./styles.scss";

export type TForms = "login" | "register";

export const Forms = () => {
  const [activeForm, setActiveForm] = useState<TForms>("login");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const switchForm = (formType: TForms) => {
    if (formType === activeForm) {
      setIsCollapsed(!isCollapsed);
      return;
    };
    setIsCollapsed(false);
    setActiveForm(formType);
  };
  return (
    <div className="forms__container">
      {activeForm === "login" ? <LoginHeader /> : <RegisterHeader />}
      <FormsSwitcher switchForm={switchForm} activeForm={activeForm} />
      {activeForm === "login" ? (
        <LoginForm switchForm={switchForm} activeForm={activeForm} isCollapsed={isCollapsed}/>
      ) : (
        <RegisterForm switchForm={switchForm} activeForm={activeForm} isCollapsed={isCollapsed}/>
      )}
    </div>
  );
};
