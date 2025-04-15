"use client";

import React, { useEffect, useRef, useState } from "react";

function UseRefEx() {
  const inputRef = useRef(null);
  const rendersCountRef = useRef(0);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    rendersCountRef.current += 1;
  });
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="bg-[#555] w-[95%] mx-auto rounded-2xl px-5 py-10 mb-4">
      <input
        ref={inputRef}
        className="bg-white text-black px-3 py-2 rounded-2xl border w-full"
        placeholder={"e.g. example text"}
        type="text"
        value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
      />
      <p className="mt-4 text-center font-semibold text-2xl">
        This Component Rerendered {rendersCountRef.current} times
      </p>
    </form>
  );
}

export default UseRefEx;
