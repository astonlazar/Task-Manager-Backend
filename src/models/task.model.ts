import mongoose from 'mongoose';
import { ITask } from '../interfaces';

const taskSchema = new mongoose.Schema<ITask>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    required: true
  }
}, { timestamps: true });

export const TASK_DB_REF = "tasks";
export const TaskModel = mongoose.model(TASK_DB_REF, taskSchema);