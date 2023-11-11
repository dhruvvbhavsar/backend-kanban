import { Request, Response } from "express";
import { checkUser, generateJwt, verifyToken } from "../lib/utils.js";
import { sql } from "../lib/connect.js";

export const auth = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExists = await checkUser(email);
  if (userExists) {
    res.status(400).send("User already exists");
  }
  const token = generateJwt(email);
  //   await sendEmail(email, token);
  res.send("mail sent.");
};

export const register = async (req: Request, res: Response) => {
  const { name, username, profile, email } = req.body;
  const data =
    await sql`insert into users (name, username, profile, email) values (${name}, ${username}, ${profile}, ${email}) returning id, name, username, profile, email`;
  console.log(data);
};

export const verify = async (req: Request, res: Response) => {
  const { token } = req.query;
  const decoded = verifyToken(token);
  if (decoded) {
    const { email } = decoded;
    res.setHeader("Authorization", `Bearer ${token}`);
    res.send({
      email: email,
      exists: await checkUser(email),
    });
  } else {
    res.status(400).send("Invalid token");
  }
};
