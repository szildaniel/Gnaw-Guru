import React from "react";
import { Slides } from "./Slides";
import Image from "next/image";
import { ColorfulCircleBg } from "./ColorfulCircleBg";
import { PhoneBg } from "./PhoneBg";
import { SmallCircleBg } from "./SmallCircleBg";

export const Hero = () => {
  return (
    <div className="sign-in-hero__container">
      <Image src="/logo.svg" width={160} height={32} alt="Gnaw Guru Logo" />
      <h1 className="sign-in-hero__heading">Start your journey with us.</h1>
      <p className="sign-in-hero__text">
        Extraordinary tool created for dentists to assist in the initial analysis of tooth decay and
        dental diseases.
      </p>
      <Slides />
      <ColorfulCircleBg />
      <PhoneBg />
      <SmallCircleBg />
    </div>
  );
};
