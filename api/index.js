import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import dotenv from "dotenv";
import DB_Config from "./config/DB_Config.js";
import UserRoute from "./routes/user.route.js";
import AuthRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js"

dotenv.config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Serve is Running" + " " + port);
});

app.get("/", (req, res) => {
  res.send("My site Route is runing");
});

app.use("/api/user", UserRoute);

app.use("/api/auth", AuthRoute);
app.use("/api/post", postRoute);
app.use('/api/comment', commentRoutes);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

DB_Config();
