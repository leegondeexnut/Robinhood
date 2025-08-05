'use client'
import {useState} from 'react';
import {  useRouter } from 'next/navigation';


export default function Registration(){
    const router = useRouter()
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "Project Enthusiast",
        bio: "",
    })
    const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        setForm({ ...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        try{
            const res = await fetch('/api/user',{
                method: 'POST',
                body: JSON.stringify(form)
            });
            if(res.ok){
                alert("User Registered Successfully")
                router.push('/app/details')
               
            }
            else{
                alert("Registration Failed try loging in again")
            }
        }catch (error){
            alert("An error occured.")
        }
    }

    return(
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center sm:p-20 h-screen mt-16 ">
        <section className="p-5">
            <h1 className="mx-78 text-2xl">Create Account</h1>
            <form className="pb-7" onSubmit={handleSubmit}>
                <div className="mt-16 mx-10 grid grid-col">
                    <label className="m-4"> Create Username</label>
                    <input placeholder="Enter Username"
                     id="thetaUsername" 
                     name="username"
                     className="border-2 border-gray-600 p-2 rounded h-12 w-78" 
                     value={form.username} 
                     onChange={handlechange}/>
                </div>
                 <div className="mt-7 mx-10 grid grid-col">
                    <label className="m-4">Enter Email</label>
                    <input placeholder="Enter your Email" id="thetaEmail"
                     name="email" 
                     className="border-2 border-gray-600 p-2 rounded h-12 w-78"
                     value = {form.email}
                     onChange={handlechange}/>
                     
                </div>
                 <div className="mt-7 mx-10 grid grid-col">
                    <label className="m-4">Create Password</label>
                    <input type="password" 
                    placeholder="Enter Password" 
                    id="thetaPassword" 
                    name="password" 
                    className="border-2 border-gray-600 p-2 rounded h-12 w-78"
                    value = {form.password}
                     onChange={handlechange}/>
                </div>
                 <div className="mt-16 mx-10 grid grid-col">
                    <label className="m-4">Who would you like to register as?</label>
                    <select className="bg-black border-2 border-gray-600 p-2 rounded h-12 w-78"
                    name="role"
                    value={form.role}
                    onChange={handlechange}>
                        <option value="Project Enthusiast">Project Enthusiast</option>
                         <option value="Civil Engineer">Civil Engineer</option>
                          <option value="Architecture">Architecture</option>
                           <option value="Student">Student</option>
                            <option value="Default User">Default User</option>

                    </select>
                </div>
                 <div className="grid grid-col mt-7 mx-10">
                    <label className="m-4">Bio</label>
                    <textarea id="thetaBio" name="bio" placeholder="Say Something about yourself" className="border-2 border-gray-600 p-2 rounded min-h-78 w-78"
                    value = {form.bio}
                     onChange={handlechange}/>
                </div>
                <button type="submit" className="bg-[#40E0D0] rounded p-3 m-2 ml-22 text-xl hover:bg-red-300">Sign Up</button>
            </form>
        </section>
    </div>
    )
}