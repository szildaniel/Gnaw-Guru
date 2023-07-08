import React, { ReactNode } from "react";
import "./styles.scss";

export const SignInContainer = ({ children }: { children: ReactNode }) => {
  return <div className="sign-in-page__container container">{children}</div>;
};
