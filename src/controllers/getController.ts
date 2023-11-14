import { Request, Response } from "express";
import { sql } from "../lib/connect.js";

export const getProjectNames = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  const data =
    await sql`SELECT project_id, write_access FROM project_access WHERE user_id = ${user_id}`;

  const projectIds = data.map((row) => row.project_id);

  const projects = await sql`SELECT * FROM projects WHERE id IN ${sql(
    projectIds
  )}`;

  res.status(200).json({ projects });
};

export const getLists = async (req: Request, res: Response) => {
  const { project_id } = req.body;
  const data = await sql`SELECT * FROM lists WHERE project_id = ${project_id}`;
  res.status(200).json({ lists: data });
};

export const getTasks = async (req: Request, res: Response) => {
  const { list_id } = req.body;
  const data = await sql`SELECT * FROM tasks WHERE list_id = ${list_id}`;
  res.json({ tasks: data });
};

export const getProjectMembers = async (req: Request, res: Response) => {
  const { project_id } = req.body;
  const data =
    await sql`SELECT user_id FROM project_access WHERE project_id = ${project_id}`;
  const userIds = data.map((row) => row.user_id);
  const users = await sql`SELECT * FROM users WHERE id IN ${sql(userIds)}`;
  res.status(200).json({ users });
};
