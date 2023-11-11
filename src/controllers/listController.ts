import { Request, Response } from "express";
import { sql } from "../lib/connect.js";

export const create = async (req: Request, res: Response) => {
  const { name, project_id } = req.body;
  const data =
    await sql`INSERT INTO lists (name, project_id) VALUES (${name}, ${project_id}) RETURNING *`;
  res.send(data);
};

export const _delete = async (req: Request, res: Response) => {
  const { id } = req.body;
  const data = await sql`DELETE FROM lists WHERE id = ${id} RETURNING *`;
  res.send(data);
};
