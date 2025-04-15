import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#333] max-w-[100vw] h-[60px] ">
      <ul className="bg-[#333] w-full h-full flex items-center justify-around">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/topics"}>Topics</Link>
        </li>
        <li>
          <Link href={"/mini-projects"}>Mini Projects</Link>
        </li>
        <li>
          <Link href={"/about-me"}>About Me</Link>
        </li>
      </ul>
    </nav>
  );
}
