import nodemailer from "nodemailer";

let transportInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    //user and pass must be genuine
    user: "mmggrr839@gmail.com",
    pass: "yhlc hvgy ctxq edpd",
  },
};

export const sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transportInfo);
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error has occurred", error.message);
  }
};
