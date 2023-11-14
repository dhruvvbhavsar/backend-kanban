import { Request, Response } from "express";
import { sql } from "../lib/connect.js";

export const create = async (req: Request, res: Response) => {
  const { description, task_id } = req.body;
  const data =
    await sql`INSERT INTO checklist_items (description, task_id) VALUES (${description}, ${task_id}) RETURNING *`;
  res.send(data);
};

export const _delete = async (req: Request, res: Response) => {
  const { id } = req.body;
  const data =
    await sql`DELETE FROM checklist_items WHERE id = ${id} RETURNING *`;
  res.send(data);
};

export const check = async (req: Request, res: Response) => {
  const { id } = req.body;
  const data =
    await sql`UPDATE checklist_items SET is_completed = NOT is_completed WHERE id = ${id} RETURNING *`;
  res.send(data);
};
