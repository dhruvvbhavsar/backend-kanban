import express from "express";
import { _delete, add_user, create } from "../controllers/projectContoller.js";
export const project_router = express.Router();

project_router.post("/create", create);
project_router.post("/delete", _delete);
project_router.post("/add-user", add_user);
