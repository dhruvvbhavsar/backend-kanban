import { Resend } from "resend";
import express from "express";
import jwt from "jsonwebtoken";
import { sql } from "./connect.js";

const resend = new Resend(process.env.RESEND_URL);
const secret = process.env.SECRET;

export async function sendEmail(email: string, token: string) {
  const link = `${process.env.HOST}/verify?token=${token}`;
  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Magic Link✨",
    html: `<a href=${link}>link</a>`,
  });

  console.log(data);
}

export function checkAuthToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { authorization } = req.headers;

  if (req.path === "/" || req.path === "/verify" || req.path === "/auth") {
    return next();
  }

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    console.log(decoded);
    next();
  });
}

export function generateJwt(email: string, expiresIn: string = "30d") {
  return jwt.sign({ email }, secret, { expiresIn });
}

export async function checkUser(email: string) {
  const data = await sql`select email from users where email = ${email}`;
  return data.entries.length > 0 ? true : false;
}

export const verifyToken = (token: any) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return err;
  }
};
