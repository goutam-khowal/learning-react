"use client";

import React, { useLayoutEffect, useReducer, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface Expense {
  id: string;
  name: string;
  cost: string;
  date?: string;
  time?: string;
  timestamp?: number;
}

interface State {
  expenses: Expense[];
  error: string | null;
}

type Action =
  | {
      type: "add";
      payload: { expense: { name: string; cost: number | string } };
    }
  | {
      type: "delete";
      payload: { id: string };
    }
  | { type: "clear" };

const initialState: State = {
  expenses: [],
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      const newExpense = {
        id: uuidv4(),
        timestamp: Date.now(),
        name: action.payload.expense.name.trim().toLowerCase(),
        cost: costToString(action.payload.expense.cost),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      return {
        ...state,
        expenses: [newExpense, ...state.expenses],
        error: null,
      };
    case "delete":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "clear":
      return { ...state, expenses: [] };

    default:
      return state;
  }
}

function costToString(cost: number | string): string {
  const parsedCost = parseFloat(cost.toString());
  if (isNaN(parsedCost) || parsedCost < 0) return "0.00";
  if (parsedCost < 1000) return parsedCost.toFixed(2);
  if (parsedCost < 100_000) return (parsedCost / 1000).toFixed(4) + "K";
  if (parsedCost < 1_000_000) return (parsedCost / 100_000).toFixed(5) + "L";
  return (parsedCost / 1_000_000).toFixed(6) + "M";
}

function stringToCost(cost: string): number {
  const last = cost.slice(-1);
  const value = parseFloat(cost);
  if (last === "K") return value * 1000;
  if (last === "L") return value * 100000;
  if (last === "M") return value * 1000000;
  return value;
}

function ExpenseTracker() {
  const compRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [expense, setExpense] = useState({
    name: "",
    cost: "",
  });

  const [sortType, setSortType] = useState<
    "cost-ascending" | "cost-descending" | "time-ascending" | "time-descending"
  >("cost-ascending");

  // const [category,setCategory]

  const sortedExpenses = [...state.expenses].sort((a, b) => {
    switch (sortType) {
      case "cost-ascending":
        return stringToCost(a.cost) - stringToCost(b.cost);
      case "cost-descending":
        return stringToCost(b.cost) - stringToCost(a.cost);
      case "time-ascending":
        return a.timestamp - b.timestamp;
      case "time-descending":
        return b.timestamp - a.timestamp;
    }
  });

  useLayoutEffect(() => {
    if (compRef.current)
      compRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    if (inputRef.current) inputRef.current.focus();
  }, [state]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!expense.name.trim() || isNaN(parseFloat(expense.cost))) {
      return;
    }
    if (parseFloat(expense.cost) > 9999999) {
      return;
    }
    dispatch({ type: "add", payload: { expense } });
    setExpense({ name: "", cost: "" });
  }

  const totalExpenses: number = state.expenses.reduce(
    (total: number, expense: Expense) => total + stringToCost(expense.cost),
    0
  );

  return (
    <div
      ref={compRef}
      className="my-4 w-[330px] md:w-[450px] bg-blue-200 flex flex-col rounded mx-auto text-blue-950 font-serif rounded-t-3xl rounded-b-xl"
    >
      <div className="w-full bg-[#0095ff] text-[#d5ff55] text-shadow-lg  rounded-t-3xl py-5">
        <h1 className="text-xl md:text-3xl text-center font-bold">
          Project 3: Expense Tracker
        </h1>
      </div>
      {sortedExpenses.length > 0 && (
        <h1 className="text-xl md:text-xl text-center font-bold py-4 text-green-400 bg-teal-950">
          Total Expenses : &#8377;{totalExpenses.toFixed(2)}
        </h1>
      )}
      {sortedExpenses.length > 1 && (
        <button
          onClick={() => dispatch({ type: "clear" })}
          className="px-4 py-2 font-mono text-white bg-red-600 rounded hover:opacity-[1] opacity-[0.7] font-bold mx-auto mt-2"
        >
          Clear All Expenses
        </button>
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-1 flex flex-col  justify-center"
      >
        <input
          placeholder="e.g., groceries"
          required={true}
          ref={inputRef}
          maxLength={20}
          className="bg-[#fff] mt-2 rounded px-2 py-1 text-[#333] opacity-[0.95] focus:opacity-[1] w-[70%] mx-auto"
          type="text"
          value={expense.name}
          onChange={(e) => {
            setExpense((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <input
          placeholder="e.g., max ₹99,99,999"
          required={true}
          className="bg-[#fff] mt-2 rounded px-2 py-1 text-[#333] opacity-[0.95] focus:opacity-[1] w-[70%] mx-auto"
          type="number"
          step={0.01}
          inputMode="decimal"
          max={9999999}
          min={0}
          value={expense.cost}
          onChange={(e) => {
            setExpense((prev) => ({ ...prev, cost: e.target.value }));
          }}
        />
        {parseFloat(expense.cost) > 9999999 ? (
          <p className="text-[red] text-shadow-white text-shadow-md font-extrabold text-lg w-[70%] pl-2 mx-auto">
            Rehne de bhai!!!
          </p>
        ) : null}
        <button
          className="bg-blue-500 text-white font-bold mt-3 w-[70%] mx-auto py-1 rounded opacity-[0.8] hover:opacity-[1]"
          type="submit"
        >
          Add Expense
        </button>
      </form>
      {sortedExpenses.length > 0 ? (
        <>
          <div className="my-4 px-5 flex justify-evenly items-center gap-x-5 flex-col">
            <h1 className="mb-4 mt-2.5 text-3xl text-center italic font-serif">
              Expenses List
            </h1>
            <div className="flex flex-col gap-y-[2px] items-center bg-white px-1 rounded-2xl py-3">
              <label className="text-xs font-mono italic" htmlFor="sort">
                Sort By:
              </label>
              <select
                id="sort"
                onChange={(e) => {
                  setSortType(e.target.value as typeof sortType);
                }}
                className="bg-[#ddd] rounded-lg border-2 border-gray-300 px-2 py-2 text-sm font-mono font-extrabold opacity-[0.7] hover:opacity-[1] focus:opacity-[1] shadow-sm cursor-pointer appearance-none"
              >
                <option
                  className="text-sm font-mono font-extrabold"
                  value={"cost-ascending"}
                >
                  Cost (Low to High)
                </option>
                <option
                  className="text-sm font-mono font-extrabold"
                  value={"cost-descending"}
                >
                  Cost (High to Low)
                </option>
                <option
                  className="text-sm font-mono font-extrabold"
                  defaultChecked={true}
                  value={"time-ascending"}
                >
                  Time (Old to New)
                </option>
                <option
                  className="text-sm font-mono font-extrabold"
                  value={"time-descending"}
                >
                  Time (New to Old)
                </option>
              </select>
            </div>
          </div>
          <div className="w-ful bg-[#eee] w-[90%] mx-auto rounded px-3 py-2 flex flex-col mb-5">
            {sortedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-white px-5 py-3 border-1 border-[#99999955] rounded-xl mb-3 grid md:grid-cols-2 grid-cols-1 grid-rows-4
                md:grid-rows-2 
                gap-y-5  place-items-center gap-x-4 "
              >
                <div
                  className="font-mono capitalize wrap-break-word whitespace-break-spaces
                text-sm font-semibold"
                >
                  {expense.name}
                </div>
                <div className="font-sans font-extrabold text-[#009400]">
                  &#8377;{expense.cost}
                </div>
                {expense.date && expense.time ? (
                  <p className="text-xs text-gray-600 italic">
                    Added on: <br />
                    {expense.date} <br />
                    <span className=" text-[9px] text-gray-600 italic font-mono">
                      {expense.time}
                    </span>
                  </p>
                ) : null}
                <button
                  onClick={() => {
                    dispatch({
                      type: "delete",
                      payload: { id: expense.id },
                    });
                  }}
                  aria-label={`Delete expense ${expense.name}`}
                  className="px-4 py-2 font-mono text-white bg-red-600 rounded hover:opacity-[1] opacity-[0.7] font-bold"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid place-content-center bg-[#eee] rounded-b-xl py-10 mt-5">
          <p className="font-sans italic font-semibold opacity-[.75]">
            // No Expenses added yet
          </p>
        </div>
      )}
    </div>
  );
}

export default ExpenseTracker;

// *🌟 Possible Add-Ons for Later*

// Edit Expense feature

// Date tracking (e.g., when an expense was added)

// Category tags (like Food, Transport, etc.)

// Export to CSV

// *String to Cost*
// Trash
// function costAnalyzer(cost: string, id: number): number {
//   const last = state?.expenses
//     .filter((expense) => expense.id === id)[0]
//     .cost.toString()
//     .slice(-1);

//   if (last === "K") {
//     return parseFloat(cost) * 1000;
//   } else if (last === "M") {
//     return parseFloat(cost) * 1000 * 1000;
//   } else if (last === "L") {
//     return parseFloat(cost) * 100 * 1000;
//   }
//   return parseFloat(cost);
// }

// *Cost to String*
// function costAnalyzer(cost: number | string): string {
//   const thousand = 1000;
//   const lakh = thousand * 100;
//   const million = thousand * 1000;

//   const parsedCost = parseFloat(cost);
//   if (parsedCost < thousand) {
//     return parsedCost.toFixed(2);
//   } else if (parsedCost >= thousand && parsedCost < lakh) {
//     return (parsedCost / thousand).toFixed(4) + "K";
//   } else if (parsedCost >= million) {
//     return (parsedCost / million).toFixed(6) + "M";
//   } else if (parsedCost >= lakh && parsedCost < million) {
//     return (parsedCost / lakh).toFixed(5) + "L";
//   }
//   return parsedCost.toString();
// }
