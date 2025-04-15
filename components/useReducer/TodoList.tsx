"use client";

import React, { useReducer, useState } from "react";

interface Todo {
  id: number;
  task: string;
  status: boolean;
}

interface State {
  todos: Todo[];
  error: string | null;
}

type Action =
  | { type: "add"; payload: { task: string } }
  | { type: "toggle"; payload: { id: number } }
  | { type: "delete"; payload: { id: number } };

function todosReducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      const newTodo: Todo = {
        id: Date.now(),
        task: action.payload.task,
        status: false,
      };
      return { ...state, todos: [...state.todos, newTodo] };

    case "toggle":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, status: !todo.status }
            : todo
        ),
      };

    case "delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    default:
      return state;
  }
}

function TodoList() {
  const [task, setTask] = useState("");
  const [state, dispatch] = useReducer(todosReducer, {
    todos: [],
    error: null,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (task.trim() !== "") {
          dispatch({ type: "add", payload: { task: task } });
          setTask("");
        }
      }}
      className="bg-blue-500 flex flex-col items-center w-full"
    >
      <h1 className="text-3xl my-5 font-bold text-shadow-sm text-shadow-blue-950">
        Todo List - using useReducer
      </h1>
      <div className="flex items-center bg-orange-400 p-5 gap-x-5 rounded-3xl w-[90%] justify-center">
        <input
          className="cursor-text w-[60%] pl-4 bg-[#222] rounded-lg py-4 font-medium font-mono  focus:shadow-inner focus:shadow-[#444]"
          type="text"
          onChange={(e) => {
            setTask(e.currentTarget.value);
          }}
          value={task}
        />
        <button
          className="cursor-pointer bg-[#333] py-4 px-2 rounded-lg  border-b-1 border-[#555] hover:bg-[#222] transition-colors duration-500 font-semibold"
          type="submit"
        >
          Add Task
        </button>
      </div>

      <ul className="my-5 bg-[#111] w-[90%] flex flex-col items-center rounded-2xl">
        {state.todos.map((todo) => (
          <li
            className="w-full flex justify-between py-4 items-center px-4"
            key={todo.id}
          >
            <span className="flex items-center w-[75%] bg-[#ddd] px-2 py-2 rounded-lg text-black font-bold whitespace-pre-wrap">
              <span
                className="flex-1"
                style={{
                  textDecoration: todo.status ? "line-through" : "none",
                }}
              >
                {todo.task}
              </span>
              {todo.status && <span className="ml-2">✅</span>}
            </span>

            <span className="w-[25%] flex justify-evenly">
              <button
                className="cursor-pointer bg-[#333] py-2 px-2 rounded-lg  border-b-1 border-[#555] hover:bg-[#222] transition-colors duration-500 font-semibold"
                onClick={() =>
                  dispatch({ type: "toggle", payload: { id: todo.id } })
                }
              >
                {todo.status ? "Undo" : "Mark Done"}
              </button>
              <button
                className="cursor-pointer bg-[#333] py-2 px-2 rounded-lg  border-b-1 border-[#555] hover:bg-[#222] transition-colors duration-500 font-semibold"
                onClick={() =>
                  dispatch({ type: "delete", payload: { id: todo.id } })
                }
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default TodoList;
