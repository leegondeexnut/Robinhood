"use client";
import { ZCOOL_KuaiLe } from "next/font/google";
import { DiVim } from "react-icons/di";

export default function Form({
  title,
  blank,
}: {
  title: string;
  blank: { name: string; id: string }[];
}) {
  const handleclick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    blank.map((val) => {
      console.log(val.id);
    });
  };
  return (
    <div className="m-20">
      <div className="bg-gray-600 rounded-2xl p-8 border-2 border-white shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {title}
        </h2>
        <form onSubmit={handleclick}>
          {blank.map((item) => (
            <div key={item.id} className="m-6 grid grid-col">
              <label htmlFor={item.name}>{item.name}</label>
              <input
                type="text"
                placeholder={item.name}
                id={item.id}
                className="border-2 rounded border-white p-2"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-red-300 p-2 rounded-2xl ml-22 hover:bg-blue-300 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
