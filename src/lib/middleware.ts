import express from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET!;

export const checkAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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
};
