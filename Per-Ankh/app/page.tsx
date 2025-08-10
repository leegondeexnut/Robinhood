"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/user/verify", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push(`/Home/${data.user.email}`);
        } else {
          router.push("Home/login");
        }
      } catch (error) {
        console.error("Session check failed:", error);
        router.push("/Home/login");
      }
    }
    checkSession();
  }, 1700);
  timer
  }, [router]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center sm:p-20 h-screen p-500">
      <Image alt="No Image" src='/per-ankh.png' width={90} height={100} className="mt-60"></Image>
    </div>
  );
}
