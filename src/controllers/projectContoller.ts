import { Request, Response } from "express";
import { sql } from "../lib/connect.js";

export const create = async (req: Request, res: Response) => {
  const { name, owner, is_public } = req.body;

  try {
    const insertedProject = await sql`
      INSERT INTO projects (name, owner, is_public) 
      VALUES (${name}, ${owner}, ${is_public}) 
      RETURNING *`;

    const projectId = insertedProject[0].id;

    const projectAccessData = await sql`
      INSERT INTO project_access (user_id, project_id, write_access)
      VALUES (${owner}, ${projectId}, true)`;

    const projectData =
      await sql`SELECT * FROM projects WHERE id = ${projectId}`;

    res.send(projectData);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const add_user = async (req: Request, res: Response) => {
  const { user_id, project_id, write_access } = req.body;

  try {
    const projectAccessData = await sql`
      INSERT INTO project_access (user_id, project_id, write_access)
      VALUES (${user_id}, ${project_id}, ${write_access}) returning *`;

    res.send(projectAccessData);
  } catch (error) {
    console.error("Error adding user to project:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const _delete = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const deletedProject = await sql`
      DELETE FROM projects WHERE id = ${id} RETURNING *`;

    res.send(deletedProject);
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("Internal Server Error");
  }
};
