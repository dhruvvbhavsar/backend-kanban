import express from "express";
import { _delete, check, create } from "../controllers/checklistController.js";

export const checklist_router = express.Router();

checklist_router.post("/create", create);
checklist_router.post("/delete", _delete);
checklist_router.post("/check", check);
