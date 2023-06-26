import React from "react";

export const Dot = ({
  isActive,
  setActiveSlide,
  index,
}: {
  isActive: boolean;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}) => {
  return (
    <div onClick={() => setActiveSlide(index)} className={isActive ? "dot active" : "dot"}></div>
  );
};
