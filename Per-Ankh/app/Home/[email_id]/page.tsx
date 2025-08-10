'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Nav from '@/app/components/Nav'
import Link from 'next/link'
import  Image  from 'next/image'
import debounce from 'lodash/debounce'
import * as React from 'react';


export default function  DetailsPage({ params }) {

    const router = useRouter()

    const [user, setUser] = useState([])
    const getUser = async (userEmail)=>{
        const human = await fetch(`../api/user/email/${userEmail}`)
        const data = await human.json()
        if(!human.ok){
            console.error('something went wrong prolly with programmers brain')
        }
        if(human.ok){
            setUser(data.user)
        }else{
            console.error("at this point I'm sure the programmer is retarded")
        }
    }




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
          getUser(data.user.email)
        } else {
          router.push("Home/login");
        }
      } catch (error) {
        console.error("Session check failed:", error);
        router.push("Home/login");
      }
    }
    checkSession();
  }, [router]);






    
    const [dailyfeed, setDailyFeed] = useState([])

    const showFeed = async ()=>{
       try{ const feedSearch = await fetch(`../api/feeds`)
        if (!feedSearch.ok) throw new Error('Failed to fetch feed')
        const res = await feedSearch.json()
        const resData = res.feeds
        const fetchUser = await Promise.all(
        resData.map(async (item)=>{
            const freak = await fetch(`../api/user/${item.user_id}`)
            const freakData = await freak.json()
            return {...item,  user: freakData.user}
        })
    )
    setDailyFeed(fetchUser)


    }catch (error){
        Response.json(error)
        console.error(error)
    }
}

    useEffect(() =>{
        showFeed();
    }, [])

    const [searchName, setSearchName] = useState("")
    const [searchResult, setSearchResult] = useState([])






    const handleSearch = debounce(async (sol)=>{
        if(!sol){
           return;
           
        }
        const nameSearch = await fetch(`../api/user/search/${sol}`)
        const res = await nameSearch.json();
        setSearchResult(res.user)
        console.log(res.user)
        return;
    }, 500
    );


    

    const [close, setClose] = useState(true)
    const openForm = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(close === true){
            setClose(false)
        }
    }
    const closeForm = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(close === false){
            setClose(true)
        }
    }
        
    useEffect(()=>{
        handleSearch(searchName)
    }, [searchName, handleSearch])

    const [data, setData] = useState({
        user_id: user.use_id,
        post_text: "",
        post_image: "",
    })


    const handleChange = (e: React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement>)=>{

        setData({ ...data, [e.target.name]: e.target.value})
    }
const handleclick = async (e) => {
        e.preventDefault()
        
        if (!data.post_text.trim()) {
            alert('Please write something before posting')
            return
        }

        try {
            const response = await fetch('/api/feeds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            
            if (response.ok) {
                const result = await response.json()
                console.log('Post created:', result)
                alert("Post created successfully!")
                setData({
                    user_id: user.use_id,
                    post_text: "",
                    post_image: "",
                })
                setClose(true)
                showFeed() // Refresh the feed
            } else {
                throw new Error('Failed to create post')
            }
        } catch (error) {
            console.error("Error creating post:", error)
            alert("Sorry, there was an error creating your post. Please try again.")
        }
    }



    return(



         <div className="font-sans flex  px-4 min-h-screen">
            <Nav
          title="Navigation"
          page={[{ href: "/details", title: "Details" }]}
        ></Nav>



            <div className="pb-7 flex flex-wrap col-span-2 ">
        <div id="projects" className="left-0 w-auto h-[75vh] b mt-35 rounded-2xl mb-8 border-2 border-white p-5 overflow-y-auto">
            <div>
            <div className="w-30 h-9 ml-46 rounded bg-green-200">color</div>
            </div>
            <div className="p-3">
                <h2 className="text-green-200 text-1.5xl ml-18">See your Projects</h2>
                <input name="repoSearch" id="repoSearch" placeholder="search project" type="search" className="border-2 border-gray-600 items-center p-2 text-0.5rem rounded" ></input>
                <div></div>
            </div>
        </div>
        </div>

        <div id="feed" className="  h-[75vh] mt-35 rounded-2xl ml-8 mb-8 border-2 border-white p-5 overflow-y-auto w-[75vw] p-6 flex">
            <div className="flex-4 b-red-300">
                <div className="flex items-center justify-between">
                <h2 className=" ml 66 text-2xl font-bold">Home</h2>
                <button className="bg-green-2300 text-blue-600 bold px-3 py-1 rounded-xl mx-12 border-2 hover:cursor-pointer hover:bg-green-200" onClick={openForm}>upload</button>
                <form onSubmit={handleclick} className={`bg-gray-600 rounded-xl w-[32%] mt-40 absolute  ${close ? 'hidden' : ''}`}>
                    <div className={`w-full flex justify-end`}>
                    <button className="m-3" onClick={closeForm}>X</button>
                    </div>
                    <div className="border-b-1 m-2">
                    <h2 className="font-bold text-1.5xl m-2 mx-24 ">upload feed</h2>
                    </div>
                    <div>
                        
                        <textarea name="post_text" value={data.post_text} placeholder='write something here...' className="w-full p-3 text-sm focus:outline-none focus:ring-0" onChange={handleChange}/>
                    </div>
                    <div className="my-4 p-1"><button className="bg-red-300 p-1 mx-4 text-base rounded hover:bg-blue-300" type="submit">share</button></div>
                </form>
                </div>
                <div className="mt-2 w-full h-[93.7%] flex flex-col gap-3">
                    {dailyfeed.map((fed)=>(
                    
                    <div key={fed?.post_id} className=" border-y-2 rounded border-gray-600 w-[97%] min-h-[15%] mr-10 flex flex-cols-2">
                        <div className=" p-3">
                            <img src={fed?.user.image_url} alt='no img' className="w-10 rounded"/>
                        </div>
                        <div>
                        <Link href={`../bio/${fed?.user.use_id}`}><p className="pl-2 text-bold border-b-1 w-60 mb-2 hover:text-green-300" >{fed?.user.username}</p></Link>
                        <p className="pl-2 mb-2 text-xs">{fed?.post_text}</p>
                        </div>
                    </div>
                    ))
}

                    
                </div>

            </div>
            
            <div className="flex-1 bg-gray-600 h-[90%] mt-10 position-fix rounded-xl">
                <form>
                <input type='search' placeholder="Search for people" className="border-2 border-black rounded-2xl mt-4 mx-8 p-2 text-sm items-center" onChange={(e) => setSearchName(e.target.value)}/>
                </form>
                <div>
  {searchResult?.length > 0 ? (
    searchResult.map((leg) => (
      <a
        className="m-2 w-40 block text-sm ml-8"
        key={leg.use_id || leg.use_id}
        href={`/bio/${leg.use_id}`}
      >
        {leg.username}
      </a>
    ))
  ) : (
    searchName && <p className="text-gray-300 m-2 text-sm">No results found</p>
  )}
</div>
            </div>

        </div>
        




         </div>
    )
}