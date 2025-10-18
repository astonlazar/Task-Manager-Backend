import { Request, Response } from "express"
import { TaskModel } from "../../../models/task.model";
import { HTTP } from "../../../utils/status-codes";

export default class TaskController {

  getAllTasks = async (req: Request, res: Response) => {
    try {
      const { status, sortByDate } = req.query;

      const filter: any = {};
      if (status && ["pending", "completed"].includes(status as string)) {
        filter.status = status;
      }

      let sortOption: any = {};
      if (sortByDate === "asc") sortOption.createdAt = 1;
      else if (sortByDate === "desc") sortOption.createdAt = -1;

      const tasks = await TaskModel.find(filter).sort(sortOption)

      return res.status(HTTP.OK).json({ message: "Tasks fetched successfully", taskCount: tasks.length, data: tasks })
    } catch (error) {
      return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message })
    }
  }

  getOneTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(HTTP.BAD_REQUEST).json({ message: "Id required" })
      }

      const task = await TaskModel.findById(id);
      if (!task) {
        return res.status(HTTP.NOT_FOUND).json({ message: "Task not found" })
      }

      return res.status(HTTP.OK).json({ message: "Task fetched successfully", data: task })
    } catch (error) {
      return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message })
    }
  }

  createTask = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(HTTP.BAD_GATEWAY).json({ message: "Inputs required" })
      }

      const newTask = new TaskModel({ title, description, status: "pending" })

      await newTask.save()

      console.log(newTask)

      return res.status(HTTP.CREATED).json({ data: newTask, message: "Task created successfully" })
    } catch (error) {
      return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message })
    }
  }

  updateTask = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      const { id } = req.params;

      if (!id || !title || !description) {
        return res.status(HTTP.BAD_REQUEST).json({ message: "Inputs required" })
      }

      const taskToUpdate = await TaskModel.findById(id);
      if (!taskToUpdate) {
        return res.status(HTTP.NOT_FOUND).json({ message: "Task not found" })
      }

      taskToUpdate.title = title;
      taskToUpdate.description = description;

      await taskToUpdate.save();

      return res.status(HTTP.OK).json({ message: "Task updated successfully" })
    } catch (error) {
      return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message })
    }
  }

  deleteTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(HTTP.BAD_REQUEST).json({ message: "Id required" })
      }

      const taskToDelete = await TaskModel.findByIdAndDelete(id);
      if (!taskToDelete) {
        return res.status(HTTP.NOT_FOUND).json({ message: "Task not deleted" })
      }

      return res.status(HTTP.OK).json({ message: "Task deleted successfully" })
    } catch (error) {
      return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message })
    }
  }

  changeStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(HTTP.BAD_REQUEST).json({ message: "Inputs required" })
      }

      const task = await TaskModel.findById(id);
      if (!task) {
        return res.status(HTTP.NOT_FOUND).json({ message: "Task not found" })
      }

      task.status =  task.status === "completed" ? "pending" : "completed";

      await task.save();

      return res.status(HTTP.OK).json({ message: "Task status updated successfully" })

    } catch (error) {
      return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message })
    }
  }
}