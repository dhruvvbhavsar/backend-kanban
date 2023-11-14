import express from "express";
import {
  _delete,
  _new,
  like,
  reply,
  unlike,
} from "../controllers/commentController.js";

export const comment_router = express.Router();

comment_router.post("/new", _new);
comment_router.post("/like", like);
comment_router.post("/unlike", unlike);
comment_router.post("/reply", reply);
comment_router.post("/delete", _delete);
