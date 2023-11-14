import express from "express";

import { _delete, _new, move } from "../controllers/taskController.js";
export const task_router = express.Router();

task_router.post("/new", _new);
task_router.post("/move", move);
task_router.post("/delete", _delete);
