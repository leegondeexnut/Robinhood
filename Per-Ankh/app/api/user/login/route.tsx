import knex from "knex";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import knexConfig from "@/knexfile";
require("dotenv").config();

const kn = knex(knexConfig.development);


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if ( !email || !password  ) {
      return NextResponse.json({ error: "Oops you might have left one or more fields empty" }, { status: 400 });
    }
    const existingEmail = await kn('users').where("email", email);

    if (existingEmail.length === 0) {
      return NextResponse.json({ error: "This email does not exist." }, { status: 409 });
    }
    const pass = existingEmail.map((val)=>{
        return val.password
    })
    const match = await bcrypt.compare(password, pass[0]);
    if(!match){
        return NextResponse.json({error: "The password didnt match try again."}, {status: 422});
    }
    return NextResponse.json({ message: "Logged in successfully", user: existingEmail }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}