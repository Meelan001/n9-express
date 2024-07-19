import mongoose from "mongoose";

let studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  file: {
    type: String,
  },
});

export default studentSchema;
