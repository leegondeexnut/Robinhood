"use client";
import Link from "next/link";
import Search from "@/app/components/Search"

import { useEffect, useState, useRef } from "react";

export default function Nav({
  title,
  page,
}: {
  title: string;
  page: { href: string; title: string }[];
}) {
  const [scrollDown, setScrollDown] = useState(false);
  const lastYRef = useRef(0);
  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      if (currentY > lastYRef.current) {
        setScrollDown(true);
      } else {
        setScrollDown(false);
      }
      lastYRef.current = currentY;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`bg-black border-2 border-[#3d3d3d] rounded-lg text-white w-[95%] mx-8 m-4 py-2 px-8 flex flex-cols justify-between fixed transition-transform duration-300 ${
        scrollDown ? "translate-y-full hidden" : "translate-y-0 opacity-100"
      }`}
    >
      <div>
        <h2 className="text-xl py-4">{title}</h2>
      </div>
      <Search Id="mainSearch" Placeholder="Search Something"/>
      <ul>
        {page.map((item) => (
          <li
            key={item.href}
            className="p-2 m-4 bg-red-300 rounded-2xl hover:bg-blue-300"
          >
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
