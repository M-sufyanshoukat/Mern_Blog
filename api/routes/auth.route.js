import express from "express";
import {
  signup,
  signin,
  google,
  passwordResetRequest,
  passwordReset
} from "../controller/auth.controller.js";

const AuthRoute = express.Router();

AuthRoute.post("/signup", signup);
AuthRoute.post("/signin", signin);
AuthRoute.post("/google", google);
AuthRoute.post("/reset-password-request", passwordResetRequest);
AuthRoute.post("/reset-password/", passwordReset);

export default AuthRoute;
