import mongoose from "mongoose";

export interface ITask {
  _id?: string;
  userId: mongoose.Types.ObjectId,
  title: string;
  description?: string;
  status: "pending" | "completed";
  createdAt?: string;
  updatedAt?: string;
}
