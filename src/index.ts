import { checkDbConnection, sql } from "./lib/connect.js";
import express from "express";
import * as dotenv from "dotenv";
import { checkAuthToken } from "./lib/middleware.js";
import { project_router } from "./routes/projectRoutes.js";
import { auth_router } from "./routes/authRoutes.js";
import { list_router } from "./routes/listRoutes.js";
import { task_router } from "./routes/taskRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json(), express.urlencoded());

app.get("/", (req, res) => {
  res.send("Welome to Intent API.");
});

app.use("/auth", auth_router);
app.use("/project", project_router);
app.use("/list", list_router);
app.use("/task", task_router);

app.listen(port, async () => {
  console.log(`Intent server listening at http://localhost:${port} 👁️`);
  checkDbConnection().then((status) => {
    console.log(`Database status: ${status}`);
  });
});
