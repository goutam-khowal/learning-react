import Navbar from "@/components/Navbar";
import React from "react";

const AboutMe = () => {
  return (
    <div className="h-[calc(100vh-60px)] w-[100vw]">
      <Navbar />
      <h1 className="text-5xl text-center mt-5">
        About Me
      </h1>
    </div>
  );
};

export default AboutMe;
