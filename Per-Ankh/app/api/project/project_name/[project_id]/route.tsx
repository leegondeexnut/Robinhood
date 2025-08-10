import knex from "knex";
import knexConfig from "@/knexfile";
require("dotenv").config("@/.env");
const kn = knex(knexConfig.development);



export async function GET(req: Request, { params }: { params: { project_id: string } }) {
  try {
    const { project_id } = params;

    const project = await kn("project").where("project_id", project_id);

    if (project.length === 0) {
      return new Response(JSON.stringify({ message: "No project found." }), { status: 404 });
    }

    return new Response(JSON.stringify({ project }), { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return new Response(JSON.stringify({ message: "Check the error and fix it yourself." }), {
      status: 500,
    });
  }
}