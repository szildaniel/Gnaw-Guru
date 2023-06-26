import React from "react";
import { Slides } from "./Slides";

export const Hero = () => {
  return (
    <div className="sign-in-hero__container">
      <span className="logo">Gnaw Guru</span>
      <h1 className="sign-in-hero__heading">Start your journey with us.</h1>
      <p className="sign-in-hero__text">
        Extraordinary tool created for dentists to assist in the initial analysis of tooth decay and
        dental diseases.
      </p>
      <Slides />
    </div>
  );
};
