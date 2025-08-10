import knex from "knex";
import knexConfig from "@/knexfile";
require("dotenv").config("@/.env");
const kn = knex(knexConfig.development);

export async function GET(req: Request, { params }) {
    try{
  const { project_id } = await params;
  const user = await kn("project_user").where( 'user_id', project_id);

  if(!user){
    return Response.json("no project yet.")
  }
  return Response.json({ user: user });

    } catch(error){
        return Response.json({message: "user doesnt have any project i guess"})
    }
}


