import knex from "knex";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
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
    const id = existingEmail.map((val)=>{
        return val.use_id
    })


    const match = await bcrypt.compare(password, pass[0]);
    if(!match){
        return NextResponse.json({error: "The password didnt match try again."}, {status: 422});
    }
    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const [session] = await kn('sessions').insert({
      user_id: id[0],
      token,
      expires_at: expiry
    })
    .returning('*')

    const response = NextResponse.json(
      {
        message: 'Logged in successfully',
        user: { existingEmail },
        expiresAt: session.expires_at,
      },
      { status: 200 }
    );
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}