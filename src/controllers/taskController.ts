import { Request, Response } from "express";
import { sql } from "../lib/connect.js";

export const _new = async (req: Request, res: Response) => {
  const { name, description, list_id } = req.body;
  const data = await sql`
    INSERT INTO tasks (name, description, list_id) 
    VALUES (${name}, ${description}, ${list_id})
    RETURNING *
    `;
  res.send(data);
};

export const move = async (req: Request, res: Response) => {
  const { list_id, prev_id, next_id } = req.body;
  //do stuff
};

export const _delete = async (req: Request, res: Response) => {
  const { id } = req.body;
  const data = await sql`
        DELETE FROM tasks WHERE id = ${id}
        RETURNING *
        `;
  res.send(data);
};
