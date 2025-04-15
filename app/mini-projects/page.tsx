import BMI from "@/components/mini-projects/BMI";
import Calculator from "@/components/mini-projects/Calculator";
import ExpenseTracker from "@/components/mini-projects/ExpenseTracker";
import ShoppingCart from "@/components/mini-projects/ShoppingCart/ShoppingCart";
import Navbar from "@/components/Navbar";
import React from "react";

function MiniProjects() {
  return (
    <>
      <Navbar />
      <ShoppingCart />
      {/* <BMI />
      <Calculator />
      <ExpenseTracker /> */}
    </>
  );
}

export default MiniProjects;
