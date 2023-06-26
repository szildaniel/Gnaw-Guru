import React from "react";
import { ISlideExtended } from "./types";
import Image from "next/image";

export const Slide = ({ text, author, avatarUrl, isActive }: ISlideExtended) => {
  return (
    <div className={isActive ? "sign-in-hero__slide active" : "sign-in-hero__slide"}>
      <p className="sign-in-hero__slide-text">{text}</p>
      <div className="sign-in-hero__person">
        <div className="sign-in-hero__img-container">
          <Image src={avatarUrl} alt="Person picture" width={55} height={55} />
        </div>
        <p className="sign-in-hero__slide-author">{author}</p>
      </div>
    </div>
  );
};
