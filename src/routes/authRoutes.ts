import express from "express";
import { auth, register, verify } from "../controllers/authController.js";
export const auth_router = express.Router();

auth_router.post("/magic", auth);
auth_router.post("/register", register);
auth_router.post("/verify", verify);
