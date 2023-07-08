import React, { useState } from "react";
import { ISlide } from "./types";
import { Slide } from "./Slide";
import { Dot } from "./Dot";
import { Dots } from "./Dots";

const slidesContent: ISlide[] = [
  {
    text: "Simply unbelievable! I Am really satisfied with my projects and business. This is Absolutely wonderful!",
    author: "Jeremy Wicked",
    avatarUrl: "/human1.jpg",
  },
  {
    text: "The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
    author: "Marcel Jablonsky",
    avatarUrl: "/human2.jpg",
  },
  {
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
    author: "Christoffer Babinsky",
    avatarUrl: "/human3.jpg",
  },
];

export const Slides = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <div className="sign-in-hero__slides">
        {slidesContent &&
          slidesContent.map(({ text, author, avatarUrl }, i) => (
            <Slide
              key={i}
              text={text}
              author={author}
              avatarUrl={avatarUrl}
              isActive={i == activeSlide}
            />
          ))}
        <Dots>
          {slidesContent &&
            slidesContent.map((slide, i) => (
              <Dot isActive={i == activeSlide} key={i} index={i} setActiveSlide={setActiveSlide} />
            ))}
        </Dots>
      </div>
    </>
  );
};
