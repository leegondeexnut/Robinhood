"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
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
  }, [router]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center sm:p-20 h-screen"></div>
  );
}
