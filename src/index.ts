import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.cookie("visited", "true", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
