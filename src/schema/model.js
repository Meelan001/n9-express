import mongoose from "mongoose";
import webUSerSchema from "./webUserSchema.js";

export const WebUser = mongoose.model("WebUser", webUSerSchema);
