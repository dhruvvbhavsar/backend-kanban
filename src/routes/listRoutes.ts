import express from "express";

import { _delete, create } from "../controllers/listController.js";
export const list_router = express.Router();

list_router.post("/create", create);
list_router.post("/delete", _delete);
