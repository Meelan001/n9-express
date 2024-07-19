import mongoose from "mongoose";
import webUSerSchema from "./webUserSchema.js";
import studentSchema from "./studentSchema.js";

export const WebUser = mongoose.model("WebUser", webUSerSchema);
export const Student = mongoose.model("Student", studentSchema);
