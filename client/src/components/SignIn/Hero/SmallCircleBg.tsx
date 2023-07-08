import Image from "next/image";
import React from "react";

export const SmallCircleBg = () => {
  return (
    <div className="sign-in-hero__small-circle-bg">
      <Image
        height={0}
        width={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
        src="/signin-bg-2.png"
        alt="Small colorful circle"
      />
    </div>
  );
};
