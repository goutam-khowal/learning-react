"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function AxiosExample() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        setData(response.data);
        console.log("Data Loaded");
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }

    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { id: Date.now(), title: item, body: item };

    async function postData() {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          newItem
        );

        setData((prev) => [response.data, ...prev]);
        console.log("Item added: ", response.data);
      } catch (error) {
        console.log("Error posting data:", error.message);
      }
    }

    postData();
    setItem("");
  }
  function handleChange(e) {
    setItem(e.target.value);
  }

  return (
    <div className="w-full bg-blue-500 my-5 p-5 flex flex-col items-center">
      <form
        className="bg-black w-[50%] flex flex-col justify-between px-4 py-3 rounded-2xl border border-[red] gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-[#ddd] px-3 py-1 rounded-lg text-black"
          type="text"
          value={item}
          onChange={handleChange}
        />
        <button
          className="bg-blue-500 px-1 rounded w-fit self-center py-3"
          type="submit"
        >
          Add new item
        </button>
      </form>
      {data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

export default AxiosExample;
