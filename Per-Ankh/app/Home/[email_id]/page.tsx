'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import * as React from 'react';


export default function DetailsPage({ params }) {

    const fetchData = async () => {
        const { email_id } = await params as string;
        const data = fetch(`/api/user/email/${email_id}`)
        console.log(data.email)
    }
    fetchData()


    return(
         <div className="font-sans flex pt-20 sm:p-5 min-h-screen">



            <div className="pb-7 flex flex-wrap col-span-2">
        <div id="projects" className="left-0 w-87 h-[75vh] b mt-35 rounded-2xl mb-8 border-2 border-white p-5 overflow-y-auto">
            <div>
            <div className="w-30 h-9 ml-46 rounded bg-green-200">color</div>
            </div>
            <div className="p-3">
                <h2 className="text-green-200 text-1.5xl ml-18">See your Projects</h2>
                <input name="repoSearch" id="repoSearch" placeholder="search project" type="search" className="border-2 border-gray-600 items-center p-2 text-0.5rem rounded" ></input>
            </div>
        </div>
        </div>

        <div id="feed" className=" w-87 h-[75vh] b mt-35 rounded-2xl ml-16 mb-8 border-2 border-white p-5 overflow-y-auto w-[50vw]">

        </div>




         </div>
    )
}