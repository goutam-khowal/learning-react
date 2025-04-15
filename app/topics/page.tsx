import Navbar from "@/components/Navbar";
import React from "react";
import Separator from "@/components/Separator";
import Boxes from "@/components/useLayoutEffect/Boxes";
import TodoList from "@/components/useReducer/TodoList";
import Transition from "@/components/useTransition/Transition";
import Parent from "@/components/useImperativeHandle/Parent";

const Topics = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Separator />
      <TodoList />
      <Separator />
      <Transition />
      <Separator />
      <Boxes />
      <Separator />
      <Parent />
    </>
  );
};

export default Topics;
