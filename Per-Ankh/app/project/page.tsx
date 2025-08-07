export default function () {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center sm:p-20 h-screen">
      <div className="mt-20 grid grid-col border-2 rounded-2xl w-[80vw] h-[75vh] overflow-hidden">
        <div className="flex justify-center gap-115 position-y-0 h-16 border-b-2 rounded-xl h-[7vh]">
          <div></div>
          <h1 className="rounded-2xl p-2 m-2">Project Name</h1>
          <button className="border-2 rounded-2xl bg-red-300 hover:bg-blue-300 cursor-pointer p-2 m-2">
            Update
          </button>
        </div>
        <div className="h-[66vh] flex ">
          <div className="flex-2 border-r-2 p-2">
            <div className="flex justify-center">
              <h1>Latest Updates</h1>
            </div>
            <div className="">
              <p></p>
            </div>
          </div>

          <div className="h-full flex-1 p-2">
            <div className="flex justify-center">
              <h1>Project Details</h1>
            </div>
            <div>
              <input type="file"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
