"use client";

export default function Search({
  Id,
  Placeholder,
}: {
  Id: string;
  Placeholder: string;
}) {
  return (
    <div className="flex h-12">
      <input
        id={Id}
        name={Id}
        placeholder={Placeholder}
        className=" border-2 border-gray-600 p-2 rounded-2xl border-white"
      ></input>
      <button className="bg-red-300 rounded-lg w-10 h-10 ml-2 mt-1 p-2 hover:bg-blue-300 cursor-pointer">
        Go
      </button>
    </div>
  );
}
