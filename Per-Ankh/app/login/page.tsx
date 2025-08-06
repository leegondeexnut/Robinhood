"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handlechange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (res.ok || res.status === 201) {
        alert("User Logged in Successfully");
        return router.push("/details");
      }
      if (res.status === 422) {
        return alert("The password didn't match");
      }
      if (res.status === 409) {
        return alert("The email doesn't exist.");
      }
    } catch (error) {
      alert("Login Failed try again");
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center sm:p-20 h-screen mt-16 ">
      <section className="p-5 grid grid-col justify-items-center">
        <h1 className="mx-78 text-2xl text-[#5EA49A] ">Sign In</h1>
        <form className="pb-7" onSubmit={handleSubmit}>
          <div className="mt-7 mx-10 grid grid-col">
            <label className="m-4">Enter Email</label>
            <input
              placeholder="Enter your Email"
              id="thetaEmail"
              name="email"
              className="border-2 border-gray-600 p-2 rounded h-12 w-78"
              value={form.email}
              onChange={handlechange}
            />
          </div>
          <div className="mt-7 mx-10 grid grid-col">
            <label className="m-4">Enter Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              id="thetaPassword"
              name="password"
              className="border-2 border-gray-600 p-2 rounded h-12 w-78"
              value={form.password}
              onChange={handlechange}
            />
          </div>
          <button
            type="submit"
            className="bg-red-300 rounded-2xl p-3 m-2 ml-35 mt-7 text-xl hover:bg-blue-300 cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
}
