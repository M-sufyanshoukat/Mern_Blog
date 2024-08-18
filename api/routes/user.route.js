import express from "express";
import {
  deleteUser,
  updateUser,
  signout,
  getUsers,
  updateRole,
  getUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const UserRoute = express.Router();

UserRoute.put("/update/:userId", verifyToken, updateUser);

UserRoute.delete("/delete/:userId", verifyToken, deleteUser);

UserRoute.post("/signout", signout);
UserRoute.get("/getusers", verifyToken, getUsers);
UserRoute.get("/:userId", getUser);

UserRoute.put("/change-role/:userId", verifyToken, updateRole);

export default UserRoute;
