import React from "react";

export default function Separator() {
  return (
    <div
      className="h-[50px]  text-white flex items-center justify-center outline-10 outline-[gold] my-5"
      style={{
        background: "linear-gradient(80deg, purple 5px, pink 10px, purple 15px)",
        backgroundRepeat: "space",
        backgroundSize: "12px 100%",
      }}
    >
      <h1 className="text-2xl  font-extrabold text-shadow-lg text-shadow-blue-950 ">
        - - - - Topic Separator - - - -
      </h1>
    </div>
  );
}
