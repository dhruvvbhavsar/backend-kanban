import { checkDbConnection, sql } from "./lib/connect.js";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {
  checkAuthToken,
  checkUser,
  generateJwt,
  sendEmail,
  verifyToken,
} from "./lib/utils.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json(), express.urlencoded(), checkAuthToken);

app.get("/", (req, res) => {
  res.send("Welome to Intent API.");
});

app.post("/auth", async (req, res) => {
  const { email } = req.body;
  const userExists = await checkUser(email);
  if (userExists) {
    res.status(400).send("User already exists");
  }
  const token = generateJwt(email);
  //   await sendEmail(email, token);
  res.send("mail sent.");
});

app.post("/register", async (req, res) => {
  const { name, username, profile, email } = req.body;
  const data =
    await sql`insert into users (name, username, profile, email) values (${name}, ${username}, ${profile}, ${email}) returning id, name, username, profile, email`;
  console.log(data);
});

app.get("/verify", async (req, res) => {
  const { token } = req.query;
  const decoded = verifyToken(token);
  if (decoded) {
    const { email } = decoded;
    res.setHeader("Authorization", `Bearer ${token}`);
    res.send(`Welcome ${email}`);
  } else {
    res.status(400).send("Invalid token");
  }
});

app.listen(port, async () => {
  console.log(`Intent server listening at http://localhost:${port} 👁️`);
  checkDbConnection().then((status) => {
    console.log(`Database status: ${status}`);
  });
});
