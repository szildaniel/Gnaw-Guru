import React from "react";
import Image from "next/image";

export const ColorfulCircleBg = () => {
  return (
    <div className="sign-in-hero__circle">
      <Image
        src="/signin-bg-1.png"
        width={0}
        height={0}
        alt="Colorful circle"
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
