import React from "react";
import { TForms } from "./Forms";

type SwitcherFunction = (switchType: TForms) => void;

export const FormsSwitcher = ({
  switchForm,
  activeForm,
}: {
  switchForm: SwitcherFunction;
  activeForm: TForms;
}) => {
  return (
    <div className="form-switcher__container">
      <button
        className={activeForm === "login" ? "form-switcher__btn active" : "form-switcher__btn"}
        onClick={() => switchForm("login")}
      >
        Login
      </button>
      <button
        className={activeForm === "register" ? "form-switcher__btn active" : "form-switcher__btn"}
        onClick={() => switchForm("register")}
      >
        Register
      </button>
    </div>
  );
};
