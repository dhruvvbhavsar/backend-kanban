import { Request, Response } from "express";
import { sql } from "../lib/connect.js";

export const _new = async (req: Request, res: Response) => {
  const { user_id, task_id, comment_text } = req.body;
  const data =
    await sql`INSERT INTO comments (user_id, task_id, comment_text) VALUES (${user_id}, ${task_id}, ${comment_text}) RETURNING *`;
  res.send(data);
};

export const like = async (req: Request, res: Response) => {
  const { user_id, comment_id } = req.body;
  const data =
    await sql`INSERT INTO comment_likes (user_id, comment_id) VALUES (${user_id}, ${comment_id}) RETURNING *`;
  res.send(data);
};

export const unlike = async (req: Request, res: Response) => {
  const { user_id, comment_id } = req.body;
  const data =
    await sql`DELETE FROM comment_likes WHERE user_id = ${user_id} AND comment_id = ${comment_id} RETURNING *`;
  res.send(data);
};

export const reply = async (req: Request, res: Response) => {
  const { user_id, task_id, parent_comment_id, comment_text } = req.body;
  const data =
    await sql`INSERT INTO comments (user_id, task_id, parent_comment_id, comment_text) VALUES (${user_id}, ${task_id}, ${parent_comment_id}, ${comment_text}) RETURNING *`;
  res.send(data);
};

export const _delete = async (req: Request, res: Response) => {
  const { id } = req.body;
  const data = await sql`DELETE FROM comments WHERE id = ${id} RETURNING *`;
  res.send(data);
};
