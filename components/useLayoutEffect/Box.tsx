import React from "react";

function Box({ content }) {
  return (
    <div className="h-50 w-[90%] mx-auto my-5 bg-[#555] flex flex-col items-center justify-center border-2 rounded-2xl">
      <h1 className="text-3xl">{content}</h1>
    </div>
  );
}

export default Box;
