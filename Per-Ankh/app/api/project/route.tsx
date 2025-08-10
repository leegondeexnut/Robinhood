import knex from "knex";
import bcrypt from 'bcrypt'
import knexConfig from "@/knexfile";
require("dotenv").config();



const kn = knex(knexConfig.development);

interface ProjectInput {
  project_name: string;
  site: string;
  info: string;
  User_id: number;
  role?: "Admin";
}

export async function POST(request: Request) {
  try {
    const { project_name, site, info, User_id, role }: ProjectInput = await request.json();
    const user_id = Number(User_id)


    if (!project_name || !site || !info || !user_id) {
      return new Response(JSON.stringify({ error: "All fields (project_name, site, info, user_id) are required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!Number.isInteger(user_id) || user_id <= 0) {
      return new Response(JSON.stringify({ error: "Invalid user_id. Must be a positive integer" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const validRoles = ["admin", "member"];
    if (role && !validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role. Must be 'admin' or 'member'" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const existingProject = await kn('project')
      .where("project_name", project_name)
      .first();

    if (existingProject) {
      return new Response(JSON.stringify({ error: "This project name already exists" }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await kn.transaction(async (trx) => {
      const [createdProject] = await trx("project")
        .insert({ project_name, site, info })
        .returning("*");

      console.log('Created project:', createdProject);

      
      const user = await trx("users")
        .where("use_id", user_id)
        .first();

      if (!user) {
        throw new Error("User not found");
      }
      const projectId = createdProject.project_id || createdProject.id; 
      const existingLink = await trx("project_user") 
        .where({ user_id: user.use_id, project_id: projectId })
        .first();

      if (existingLink) {
        throw new Error("User already linked to this project");
      }

     
      await trx("project_user").insert({ 
        user_id: user.use_id,
        project_id: projectId,
        role: role || "member"
      });

      return createdProject;
    });

    return new Response(JSON.stringify({
      message: "Project created and linked to user successfully",
      project: result
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error creating project:', error);
    return new Response(JSON.stringify({
      error: error.message || "An error occurred while creating the project"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}