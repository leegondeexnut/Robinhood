'use client'



export default function Search({ Id, Placeholder }:{Id: string; Placeholder: string}){
    return(
    <div className="flex h-12">
        <input id={Id} name={Id} placeholder={Placeholder} className=" border-2 border-gray-600 p-2 rounded"></input>
        <button className="bg-gray-600 rounded m-2 p-2">Go</button>
        
    </div>
    )
}