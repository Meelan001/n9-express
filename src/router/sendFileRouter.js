import { Router } from "express";
import upload from "../utils/sendFiles.js";
import {
  multipleFileHandlerController,
  singleFileHandlerController,
} from "../controller/sendFilesController.js";

let fileRouter = Router();

fileRouter
  .route("/single")
  .post(upload.single("document"), singleFileHandlerController);
fileRouter
  .route("/multiple")
  .post(upload.array("document"), multipleFileHandlerController);

export default fileRouter;
