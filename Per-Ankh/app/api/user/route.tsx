import knex from "knex";
import knexConfig from "@/knexfile";
require("dotenv").config();
const kn = knex(knexConfig.development);

export async function GET() {
  const users = await kn("users").select("*");
  return Response.json({ users });
}

export async function POST(request: Request) {
  const { username, email, bio, password, role } = await request.json();
  const [createdfriend] = await kn("users")
    .insert({ username, email, bio, password, role })
    .returning("*");
  return Response.json(
    { message: "user created", user: createdfriend.detail },
    { status: 201 }
  );
}
