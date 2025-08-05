import knex from "knex";
import bcrypt from 'bcrypt'
import knexConfig from "@/knexfile";
require("dotenv").config();



export async function POST(request: Request) {
  try{const { username, email, bio, password, role } = await request.json();
  if(!username || ! email || !bio || !password || !role ){
    return Response.json({error:"Oops you might have left one or more fields empty"}),{status: 400}
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const existingEmail = await kn('users').where("email", email)

  if(existingEmail){
    return Response.json({error: "This email already exist"}), {status: 404}
  }

  const [createdfriend] = await kn("users")
  

    .insert({ username, email, bio, password: hashPassword, role })
    .returning("*");
  return Response.json(
    { message: "user created", user: createdfriend.detail },
    { status: 201 }
  );
}catch (error){
  console.log(Response.json({message: "ayy bruh"}))
}
}
