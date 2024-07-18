import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/home").then(() => {
    console.log("database is connected");
  });
};

export default connectDb;
