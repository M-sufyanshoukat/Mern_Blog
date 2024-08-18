import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  getposts,
  deletepost,
  updatepost,
} from "../controller/post.controller.js";

const postRoute = express.Router();

postRoute.post("/create", verifyToken, createPost);
postRoute.get("/getposts", getposts);

postRoute.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
postRoute.put("/updatepost/:postId/", verifyToken, updatepost);

export default postRoute;
