import { Router } from "express";
import {
  createWebUser,
  loginUser,
  verifyEmail,
} from "../controller/webUserController.js";

const webUserRouter = Router();
webUserRouter.route("/").post(createWebUser);
// .get(realAllWebUserController);
// webUserRouter.route("/:id").get(readSpecificWebUserController);
// webUserRouter
//   .route("/id")
//   .patch(updateWebUserController)
//   .delete(deleteWebUserController);
webUserRouter.route("/verify-email").patch(verifyEmail);
webUserRouter.route("/login").post(loginUser);
export default webUserRouter;
