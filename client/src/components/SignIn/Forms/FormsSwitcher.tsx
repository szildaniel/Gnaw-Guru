import React from "react";
import { TForms } from "./Forms";
import { Button } from "@/components/Button/Button";
type SwitcherFunction = (switchType: TForms) => void;
import UserIcon from "../../../assets/icons/user-icon.svg";
import LoginIcon from "../../../assets/icons/login-icon.svg";


export const FormsSwitcher = ({
  switchForm,
  activeForm,
}: {
  switchForm: SwitcherFunction;
  activeForm: TForms;
}) => {
  return (
    <div className="form-switcher__container">
      <Button
        textCentered={false}
        text="Login"
        type={activeForm === "login" ? "icon-secondary" : "icon-primary"}
        onClick={() => switchForm("login")}
        Icon={LoginIcon}
      />
      <Button
        textCentered={false}
        text="Sign up"
        type={activeForm === "register" ? "icon-secondary" : "icon-primary"}
        onClick={() => switchForm("register")}
        Icon={UserIcon}
      />
    </div>
  );
};
