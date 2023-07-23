import React, { SVGProps, ReactNode } from "react";
import "./styles.scss";
import UserIcon from "../../../src/assets/icons/user-icon.svg";

type ButtonProps = {
  text: string;
  Icon?: React.FunctionComponent;
  type: "primary" | "secondary" | "icon-primary" | "icon-secondary";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  textCentered?: boolean;
};

export const Button = ({ text, Icon, type, onClick, textCentered }: ButtonProps) => {
  return (
    <button
      style={{ textAlign: textCentered ? "center" : "left" }}
      className={type ? `btn btn-${type}` : "btn"}
      onClick={onClick}
    >
      {!!Icon && <Icon />}
      {text}
    </button>
  );
};
