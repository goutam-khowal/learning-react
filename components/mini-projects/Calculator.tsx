"use client";

import React, { useReducer } from "react";

function Calculator() {
  interface State {
    input: string;
    error: string | null;
  }

  type Action =
    | { type: "C"; payload: { input: string } } // Clear
    | { type: "Del"; payload: { input: string } } // Backspace
    | { type: "%"; payload: { input: string } } // Percentage
    | { type: "/"; payload: { input: string } } // Division
    | { type: "*"; payload: { input: string } } // Multiplication
    | { type: "-"; payload: { input: string } } // Subtraction
    | { type: "+"; payload: { input: string } } // Addition
    | { type: "="; payload: { input: string } } // Equals
    | { type: "."; payload: { input: string } } // Decimal point
    | { type: "0"; payload: { input: string } } // Digit 0
    | { type: "00"; payload: { input: string } } // Double zero
    | { type: "1"; payload: { input: string } } // Digit 1
    | { type: "2"; payload: { input: string } } // Digit 2
    | { type: "3"; payload: { input: string } } // Digit 3
    | { type: "4"; payload: { input: string } } // Digit 4
    | { type: "5"; payload: { input: string } } // Digit 5
    | { type: "6"; payload: { input: string } } // Digit 6
    | { type: "7"; payload: { input: string } } // Digit 7
    | { type: "8"; payload: { input: string } } // Digit 8
    | { type: "9"; payload: { input: string } }; // Digit 9

  const [inputState, inputDispatch] = useReducer(inputReducer, "2+2");

  function inputReducer(state: State, action: Action): State {
    const { input } = action.payload;

    switch (action.type) {
      case "C":
        return {
          input: "",
          error: null,
        };

      case "Del":
        // Backspace - remove the last character
        return {
          input: state.input.slice(0, -1),
          error: null,
        };

      case "%":
        return {
          input: state.input + " " + action.type + " ",
          error: null,
        };

      case "/":
      case "*":
      case "-":
      case "+":
        // Operators - add to the input with a space
        return {
          input: state.input + " " + action.type + " ",
          error: null,
        };

      case "=":
        try {
          // Evaluate the expression
          const result = eval(state.input);
          return {
            input: result.toString(),
            error: null,
          };
        } catch (err) {
          return {
            input: state.input,
            error: "Invalid expression",
          };
        }

      case ".":
        // Check if the last number already has a decimal point
        const parts = state.input.split(" ");
        const lastPart = parts[parts.length - 1];

        if (lastPart.includes(".")) {
          return state; // Don't add another decimal point
        }

        return {
          input: state.input + ".",
          error: null,
        };

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        // Append the digit to the input
        return {
          input: state.input + action.type,
          error: null,
        };

      case "00":
        // Append "00" to the input
        return {
          input: state.input + "00",
          error: null,
        };

      default:
        return state; // Return unchanged state for unhandled actions
    }
  }

  return (
    <div className="my-4 w-[330px] md:w-[450px] bg-blue-200 flex flex-col rounded mx-auto text-blue-950 font-serif rounded-t-3xl rounded-b-xl">
      <div className="w-full bg-[#0095ff] text-[#d5ff55] text-shadow-lg  rounded-t-3xl py-5">
        <h1 className="text-xl md:text-3xl text-center font-bold">
          Project 2: Calculator
        </h1>
      </div>
      <div className="w-[330px] mx-auto flex flex-col text-[#eee] my-4 rounded bg-[#333] ">
        <h1 className="text-center font-bold text-2xl">Calculator</h1>
        <h1 className="font-semibold text-2xl mx-3 bg-white px-3 text-[#777] rounded h-[40px] flex items-center overflow-clip">
          {!inputState.error ? inputState.input : inputState.error}
        </h1>
        <div className="w-full flex flex-col items-center gap-y-4 py-4">
          <div className="grid-cols-4">
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "C", payload: { input: inputState } });
              }}
            >
              C
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({
                  type: "Del",
                  payload: { input: inputState },
                });
              }}
            >
              Del
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "%", payload: { input: inputState } });
              }}
            >
              Mod
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "/", payload: { input: inputState } });
              }}
            >
              /
            </button>
          </div>
          <div className="grid-cols-4">
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "7", payload: { input: inputState } });
              }}
            >
              7
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "8", payload: { input: inputState } });
              }}
            >
              8
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "9", payload: { input: inputState } });
              }}
            >
              9
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "*", payload: { input: inputState } });
              }}
            >
              *
            </button>
          </div>
          <div className="grid-cols-4">
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "4", payload: { input: inputState } });
              }}
            >
              4
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "5", payload: { input: inputState } });
              }}
            >
              5
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "6", payload: { input: inputState } });
              }}
            >
              6
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "-", payload: { input: inputState } });
              }}
            >
              -
            </button>
          </div>
          <div className="grid-cols-4">
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "1", payload: { input: inputState } });
              }}
            >
              1
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "2", payload: { input: inputState } });
              }}
            >
              2
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "3", payload: { input: inputState } });
              }}
            >
              3
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "+", payload: { input: inputState } });
              }}
            >
              +
            </button>
          </div>
          <div className="grid-cols-4">
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "0", payload: { input: inputState } });
              }}
            >
              0
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "00", payload: { input: inputState } });
              }}
            >
              00
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: ".", payload: { input: inputState } });
              }}
            >
              .
            </button>
            <button
              className="mx-2 bg-blue-600 w-[50px] h-[50px] rounded-full text-white font-extrabold font-mono hover:opacity-[1] opacity-[0.7]"
              style={{
                boxShadow: "0px 0px 6px 1px gold",
              }}
              onClick={() => {
                inputDispatch({ type: "=", payload: { input: inputState } });
              }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
