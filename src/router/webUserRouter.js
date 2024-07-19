import { Router } from "express";
import {
  createWebUser,
  loginUser,
  myProfile,
  readAllWebUsers,
  readSpecificWebUser,
  updatePassword,
  updateProfile,
  verifyEmail,
} from "../controller/webUserController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

const webUserRouter = Router();
webUserRouter.route("/create").post(createWebUser);
// .get(realAllWebUserController);
// webUserRouter.route("/:id").get(readSpecificWebUserController);
// webUserRouter
//   .route("/id")
//   .patch(updateWebUserController)
//   .delete(deleteWebUserController);
webUserRouter.route("/verify-email").patch(verifyEmail);
webUserRouter.route("/login").post(loginUser);
webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);
webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);
webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);

webUserRouter
  .route("/")
  .get(isAuthenticated, isAuthorized(["superAdmin", "admin"]), readAllWebUsers);

//dynamic router
webUserRouter
  .route("/:id")
  .get(
    isAuthenticated,
    isAuthorized(["superAdmin", "admin"]),
    readSpecificWebUser
  );
export default webUserRouter;
