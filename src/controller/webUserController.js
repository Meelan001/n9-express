// import { WebUser } from "../schema/model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { sendEmail } from "../sendMail.js";
// import { secretKey } from "../utils/constant.js";
// export const createWebUser = async (req, res, next) => {
//   try {
//     let data = req.body;
//     let hashPassword = await bcrypt.hash(data.password, 10);

//     data = {
//       ...data,
//       isVerifiedEmail: false,
//       password: hashPassword,
//     };

//     let result = await WebUser.create(data);

//     //send mail with link
//     //generate token link=>frontend link then send mail
//     let infoObj = {
//       _id: result._id,
//     };

//     let expiryInfo = {
//       expiresIn: "5d",
//     };

//     let generateToken = await jwt.sign(infoObj, secretKey, expiryInfo);

//     //sendEmail
//     await sendEmail({
//       from: "'n9solution' <mmggrr839@gmail.com>",
//       to: data.email,
//       subject: "account created ",
//       html: `<h1>your account has been created successfully </h1>

//       <a href="http://localhost:5000/verify-email?token=${generateToken}">
//       http://localhost:5000/verify-email?token=${generateToken}
//       </a>`,
//     });

//     res.json({
//       success: true,
//       msg: "webUser created successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       msg: error.msg,
//     });
//   }
// };

// // verify email
// // postman token,get token,verify token,get _id from token, make isVerifiedEmail true
// export const verifyEmail = async (req, res, next) => {
//   try {
//     let tokenString = req.headers.authorization;
//     let tokenArray = tokenString.split(" ");
//     let token = tokenArray[1];

//     //verify token

//     let infoObj = await jwt.verify(token, secretKey);
//     let userId = infoObj._id;
//     //make is verified email true
//     let result = await WebUser.findByIdAndUpdate(
//       userId,
//       { isVerifiedEmail: true },
//       { new: true }
//     );
//     res.json({
//       success: true,
//       message: "user verified successfully",
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const loginUser = async (req, res, next) => {
//   try {
//     let email = req.body.email;
//     let password = req.body.password;

//     let user = await WebUser.findOne({ email: email });
//     if (user) {
//       if (user.isVerifiedEmail) {
//         let isValidPassword = await bcrypt.compare(password, user.password);
//         if (isValidPassword) {
//           let infoObj = {
//             _id: user._id,
//           };

//           let expiryInfo = {
//             expiresIn: "365d",
//           };

//           let generateToken = await jwt.sign(infoObj, secretKey, expiryInfo);
//           res.json({
//             success: true,
//             message: "user login successful...",
//             data: generateToken,
//           });
//         } else {
//           let error = new Error("credential does not match");
//           throw error;
//         }
//       } else {
//         let error = new Error("credential does not match");
//         throw error;
//       }
//     } else {
//       let error = new Error("credential does not match");
//       throw error;
//     }
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //login
// //email and password
// //check if that email exist(if not fount throw error)
// //check if that email is verified(if not throw error)
// //check if password match(if not throw error)
// //generate token=>(attached _id
// //send token to postman (frontend)

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { WebUser } from "../schema/model.js";
import { secretKey } from "../utils/constant.js";
import { sendEmail } from "../utils/sendMail.js";

export const createWebUser = async (req, res, next) => {
  try {
    let data = req.body;

    let hashedPassword = await bcrypt.hash(data.password, 10);

    data = {
      ...data,
      isVerifiedEmail: false,
      password: hashedPassword,
    };

    let result = await WebUser.create(data);
    //generate token

    let infoObj = {
      _id: result._id,
    };

    let expiryInfo = {
      expiresIn: "5d",
    };

    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    //sendmail
    await sendEmail({
      from: "'n9solution',<mmgg839@getMaxListeners.com>",
      to: result.email,
      subject: "account created successfully",
      html: `<h2>your account has been  created successfully </h2>
      <a href="http:localhost:5000/verify-email?token=${token}">http:localhost:5000/verify-email?token=${token}</a>
      `,
    });
    res.status(200).json({
      success: true,
      message: "webUser created successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];

    let verifyToken = await jwt.verify(token, secretKey);
    let _id = verifyToken._id;

    let result = await WebUser.findByIdAndUpdate(
      _id,
      { isVerifiedEmail: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "email verified successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await WebUser.findOne({ email: email });

    if (user) {
      if (user.isVerifiedEmail) {
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          let infoObj = {
            _id: user._id,
          };
          let expiryInfo = {
            expiresIn: "30d",
          };

          let token = await jwt.sign(infoObj, secretKey, expiryInfo);

          res.status(200).json({
            success: true,
            message: "user login successfully...",
            result: user,
            token: token,
          });
        } else {
          throw new Error("password does not match");
        }
      } else {
        throw new Error("email not verified");
      }
    } else {
      throw new Error("email does not exist");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    let _id = req._id;

    let result = await WebUser.findById(_id);
    res.status(200).json({
      success: true,
      message: "my profile visited successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await WebUser.findByIdAndUpdate(_id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "webUser updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    let _id = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let user = await WebUser.findById(_id);
    let isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (isValidPassword) {
      let hashedPassword = await bcrypt.hash(newPassword, 10);

      let result = await WebUser.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        { new: true }
      );
      {
        res.status(200).json({
          success: true,
          message: "password updated successfully",
          result: result,
        });
      }
    } else {
      let error = new Error("old password does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readAllWebUsers = async (req, res, next) => {
  try {
    let result = await WebUser.find({});
    console.log(result);
    res.status(200).json({
      success: true,
      message: "all webUsers details...",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readSpecificWebUser = async (req, res, next) => {
  try {
    let id = req.params.id;

    let result = await WebUser.findById(id);
    res.status(200).json({
      success: true,
      message: "read specific user successfully...",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
