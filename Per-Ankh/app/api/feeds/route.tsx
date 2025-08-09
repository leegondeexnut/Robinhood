import knex from "knex";
import { NextResponse } from "next/server";
import knexConfig from "@/knexfile";
require("dotenv").config();

const kn = knex(knexConfig.development);

export async function GET() {
  const feeds = await kn("feeds").orderBy('post_id', 'desc');
  return Response.json({ feeds });
}

export async function POST(request: Request) {
  try {
    const { post_text, post_image, user_id} = await request.json();
    if(!user_id){
      return NextResponse.json({error: "user_id not provided"})
    }
    if ( !post_text && !post_image ) {
      return NextResponse.json({ error: "Dang, what you tryna post" }, { status: 400 });
    }

  

    const [createdUser] = await kn("feeds")
      .insert({ post_text, post_image, user_id })
      .returning("*");

    return NextResponse.json({ message: "Posted Succesfully", user: createdUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}