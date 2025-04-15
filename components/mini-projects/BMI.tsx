"use client";

import React, { useEffect, useMemo, useState } from "react";

function BMI() {
  //   const [BMI, setBMI] = useState(0);
  const [weight, setWeight] = useState(68);
  const [height, setHeight] = useState(183);

  function bmiCalculator() {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);

    // setBMI(bmi.toFixed(2));
    return bmi.toFixed(2);
  }

  //   useEffect(() => {
  //     bmiCalculator();
  //   }, [height, weight]);

  const output = useMemo(() => {
    return bmiCalculator();
  }, [weight, height]);

  return (
    <div className="my-4 w-[330px] md:w-[450px] bg-blue-200 flex flex-col rounded mx-auto text-blue-950 font-serif rounded-t-3xl rounded-b-xl">
      <div className="w-full bg-[#0095ff] text-[#d5ff55] text-shadow-lg  rounded-t-3xl flex items-center justify-center py-5">
        <h1 className="text-xl md:text-3xl text-center font-bold">
          Project 1: BMI Calculator
        </h1>
      </div>
      <div className="w-full flex flex-col px-5 py-4">
        <label htmlFor="weight">Weight: {weight} kg</label>
        {weight == 300 && (
          <p className="text-red-600 font-semibold text-sm">Max Reached!!!</p>
        )}
        <input
          step={0.1}
          className="mb-4 hover:opacity-[1] opacity-[0.7] bg-[#fff] w-full h-2 rounded-lg appearance-none cursor-pointer accent-purple-800 mt-2"
          max={300}
          min={0}
          onChange={(e) => {
            setWeight(e.target.value);
          }}
          value={weight}
          id="weight"
          type="range"
        ></input>
        <label htmlFor="height">Height: {height} cm</label>
        {height == 300 && (
          <p className="text-red-600 font-semibold text-sm">Max Reached!!!</p>
        )}
        <input
          className="mb-4 hover:opacity-[1] opacity-[0.7] bg-[#fff] w-full h-2 rounded-lg appearance-none cursor-pointer accent-purple-800 mt-2"
          step={0.1}
          max={300}
          min={30}
          value={height}
          onChange={(e) => {
            setHeight(e.target.value);
          }}
          id="height"
          type="range"
        ></input>
        <h1 className="text-center mt-4 font-semibold">Your BMI is:</h1>
        <div className="bg-blue-600 w-fit px-5 py-3 rounded-4xl mx-auto my-4 text-white font-extrabold font-mono">
          {output}
          {/* {BMI} */}
        </div>
      </div>
    </div>
  );
}

export default BMI;
