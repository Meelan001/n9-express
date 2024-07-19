import { Router } from "express";
import {
  createStudentController,
  uploadMultipleFileController,
} from "../controller/studentController.js";
import upload from "../utils/sendFiles.js";

let studentRouter = Router();

studentRouter
  .route("/single")
  .post(upload.single("file"), createStudentController);

studentRouter
  .route("/multiple")
  .post(upload.array("file"), uploadMultipleFileController);
export default studentRouter;
