import mongoose from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  profilePicture: {
    type: String,
    required: true,
  }
}, { timestamps: true })

export const USER_DB_REF = "users";
export const userModel = mongoose.model(USER_DB_REF, userSchema);