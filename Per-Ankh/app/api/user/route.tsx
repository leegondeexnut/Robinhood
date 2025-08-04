import knex from "knex";
import knexConfig from "@/knexfile";
require("dotenv").config();
const kn = knex(knexConfig.development);

export async function GET() {
  const users = await kn("user").select("*");
  return Response.json({ users });
}

export async function POST(request: Request) {
  const { name };
}
