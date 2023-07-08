import Image from "next/image";
import React from "react";

export const PhoneBg = () => {
  return (
    <div className="sign-in-hero__phone-bg">
      <Image
        height={0}
        width={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
        src="/hero-iPhone.png"
        alt="Smartphone in hand"
      />
    </div>
  );
};
