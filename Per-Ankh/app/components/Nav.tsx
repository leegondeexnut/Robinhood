import Link from 'next/link';
export default function Nav({ title, page }: { title: string; page: { href: string; title: string }[] }) {
    return (
        <nav className=" border-2 border-[#3d3d3d] rounded-lg text white w-[95%] mx-8 m-4 py-2 px-8 flex flex-cols justify-between fixed">
            <div><h2 className="text-xl py-4">{title}</h2></div>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search for anything"
                    className="px-10 py-2 rounded-md text-lg text-white"/>
            <button className="flex items-center gap-4 rounded-md text-lg text-white bg-blue-500 cursor-pointer px-2 py-2">Search</button>
             </div>

            <ul>
                {
                    page.map((item)=> (
                        <li key={item.href} className="p-2 m-4 bg-red-300 rounded">
                        <Link href={item.href}>
                        {item.title}
                        </Link>
                        
                        </li>
                    ))
                }
            </ul>
            
        </nav>
    )
}