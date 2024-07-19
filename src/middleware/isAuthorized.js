import { WebUser } from "../schema/model.js";

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      let _id = req._id;

      let user = await WebUser.findById(_id);
      let role = user.role;

      if (roles.includes(role)) {
        next();
      } else {
        let error = new Error("user not authorized");
        throw error;
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
};
