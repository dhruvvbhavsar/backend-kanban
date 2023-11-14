import express from "express";
import {
  getLists,
  getProjectMembers,
  getProjectNames,
  getTasks,
} from "../controllers/getController.js";

export const get_router = express.Router();

get_router.post("/project-names", getProjectNames);
get_router.post("/project-members", getProjectMembers);
get_router.post("/lists", getLists);
get_router.post("/tasks", getTasks);
