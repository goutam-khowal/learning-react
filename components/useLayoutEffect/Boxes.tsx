"use client";

import React, { useLayoutEffect, useRef } from "react";
import Box from "./Box";

function Boxes() {
  const box4Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    box4Ref.current?.scrollIntoView({ behavior: "instant" });
  });

  return (
    <div className="w-full">
        <h1 className="text-5xl text-center mt-4">
            useLayoutEffect
        </h1>
      <Box content={"Box 1"} />
      <Box content={"Box 2"} />
      <Box content={"Box 3"} />
      <div
        ref={box4Ref}
        className=" font-extrabold h-25 flex items-center justify-center underline text-lg px-2 text-center"
      >
        I will be on top whenever this page renders
      </div>
      <Box content={"Box 5"} />
      <Box content={"Box 6"} />
      <Box content={"Box 7"} />
      <Box content={"Box 8"} />
    </div>
  );
}

export default Boxes;
