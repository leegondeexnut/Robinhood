'use client'
import Link from 'next/link';

import { useEffect, useState } from 'react';


export default function Nav({ title, page }: { title: string; page: { href: string; title: string }[] }) {

        const [ scrollDown, setScrollDown] = useState(false)
        const [ lastY, setLastY] = useState(0)
        useEffect(()=>{
            function onScroll(){
                const currentY = window.scrollY;
                if (currentY > lastY){
                    setScrollDown(true)
                } else{
                    setScrollDown(false)
                }
                setLastY(currentY)
            }
            window.addEventListener('scroll', onScroll);
            return () => window.removeEventListener('scroll', onScroll);

        }, [lastY])
        
    return (
        
        <nav className={`border-2 border-[#3d3d3d] rounded-lg text white w-[95%] mx-8 m-4 py-2 px-8 flex flex-cols justify-between fixed transition-transform duration-300 ${scrollDown ? 'transtlate-y-full opacity-0': 'translate-y-0 opacity-100'}`}>
            <div><h2 className="text-xl py-4">{title}</h2></div>
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