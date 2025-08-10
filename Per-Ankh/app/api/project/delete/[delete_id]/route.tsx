
import knex from "knex";
import knexConfig from "@/knexfile";
require("dotenv").config("@/.env");
const kn = knex(knexConfig.development);





export async function DELETE(request: Request, { params }) {
  try{const { delete_id } = await params ;
  const [user] = await kn("project_user")
    .where("post_id", delete_id)
    .del()
    .returning("*");
  return Response.json(`deletedProject: ${ [user] }`);
}catch{
    return Response.json({messae: "man mistake happens don't give up fix this."})
}
}