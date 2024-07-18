import express from "express";
import { json } from "express";
import cors from "cors";
import connectDb from "./src/database/connectDB.js";
// import webUserRouter from "./src/router/webUserRouter.js";
import fileRouter from "./src/router/sendFileRouter.js";

const myApp = express();
const PORT = 5000;

myApp.use(express.json());
myApp.use(cors());
myApp.use(express.static("./public"));
connectDb();

// myApp.use("/web-users", webUserRouter);
myApp.use("/files", fileRouter);

myApp.listen(PORT, () => {
  console.log(`express is running in port ${PORT}`);
});
