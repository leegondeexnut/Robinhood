import knex from "knex";
import knexConfig from "@/knexfile";
require("dotenv").config("@/.env");
const kn = knex(knexConfig.development);

export async function GET(req: Request, { params }) {
  const { email_id } = await params as string;
  const user = await kn("users").where("email", email_id).first();
  return Response.json({ user });
}

export async function DELETE(request: Request, { params }) {
  const { email_id } = await params as string;
  const user = await kn("users")
    .where("email", email_id)
    .del()
    .returning("*");
  return Response.json(`deletedUser: ${ user }`);
}
