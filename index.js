import express from "express";
import { json } from "express";
import cors from "cors";
import connectDb from "./src/database/connectDB.js";
import webUserRouter from "./src/router/webUserRouter.js";
import fileRouter from "./src/router/sendFileRouter.js";
import studentRouter from "./src/router/studentRouter.js";

const myApp = express();
const PORT = 5000;

myApp.use(express.json());
myApp.use(cors());
myApp.use(express.static("./public"));
connectDb();

myApp.use("/web-users", webUserRouter);
myApp.use("/files", fileRouter);
myApp.use("/students", studentRouter);

myApp.listen(PORT, () => {
  console.log(`express is running in port ${PORT}`);
});
