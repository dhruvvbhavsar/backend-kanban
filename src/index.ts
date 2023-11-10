import { checkDbConnection } from "./lib/connect.js";
import crypto from "crypto";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  checkDbConnection().then((status) => {
    console.log(`Database status: ${status}`);
  });
});
