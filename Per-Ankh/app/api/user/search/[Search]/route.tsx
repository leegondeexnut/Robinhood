import knex from "knex";
import knexConfig from "@/knexfile";
require("dotenv").config("@/.env");
const kn = knex(knexConfig.development);

export async function GET(req: Request, { params }) {
  try {
    const { Search } = await params;
  const user = await kn("users").where("username", "like", `%${Search}%`)
  console.log({ Search })
  return Response.json({ user });
  }catch(error){
   return Response.json({message: "No user by that username."})
  }
}