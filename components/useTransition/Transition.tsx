"use client";

import React, { useTransition, useState } from "react";

export default function Transition() {
  const [text, setText] = useState("");
  const [lists, setLists] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setText(value); // input updates immediately

    startTransition(() => {
      const textList: string[] = [];
      for (let i = 0; i < 10000; i++) {
        textList.push(value);
      }
      setLists(textList); // deferred update
    });
  }

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <h1 className="text-2xl mb-4.5">List - rendering using useTransition</h1>

      <input
        type="text"
        className="cursor-text border-2 border-amber-50 pl-5 py-3 w-[90%] rounded-2xl"
        value={text}
        onChange={handleChange}
      />

      <div className="my-3 w-[90%] text-center h-96 overflow-y-auto border rounded">
        {isPending ? (
          <h1 className="text-5xl my-4 font-semibold">Loading...</h1>
        ) : text.length === 0 ? (
          <h1 className="text-5xl my-4 font-semibold">...Nothing to Show...</h1>
        ) : (
          <ul>
            {lists.map((item, index) => (
              <li key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
