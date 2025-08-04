import knex from "knex";
import knexConfig from "@/knexfile";
require("dotenv").config("@/.env");
const kn = knex(knexConfig.development);

export async function GET(req: Request, { params }) {
  const { user_id } = await params;
  const user = await kn("users").where("use_id", Number(user_id)).first();
  return Response.json({ user });
}

export async function DELETE(request: Request, { params }) {
  const { user_id } = await params;
  const user = await kn("users")
    .where("use_id", Number(user_id))
    .del()
    .returning("*");
  return Response.json(`deletedUser: ${ user }`);
}
