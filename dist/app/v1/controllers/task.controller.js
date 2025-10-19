"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = require("../../../models/task.model");
const status_codes_1 = require("../../../utils/status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
class TaskController {
    constructor() {
        this.getAllTasks = async (req, res) => {
            try {
                const { status, sortByDate } = req.query;
                const userId = req.user.id;
                console.log({ userId });
                const filter = { userId };
                if (status && ["pending", "completed"].includes(status)) {
                    filter.status = status;
                }
                let sortOption = {};
                if (sortByDate === "asc")
                    sortOption.createdAt = 1;
                else if (sortByDate === "desc")
                    sortOption.createdAt = -1;
                const tasks = await task_model_1.TaskModel.find(filter).sort(sortOption);
                return res.status(status_codes_1.HTTP.OK).json({ message: "Tasks fetched successfully", taskCount: tasks.length, data: tasks });
            }
            catch (error) {
                return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        };
        this.getOneTask = async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(status_codes_1.HTTP.BAD_REQUEST).json({ message: "Id required" });
                }
                const task = await task_model_1.TaskModel.findById(id);
                if (!task) {
                    return res.status(status_codes_1.HTTP.NOT_FOUND).json({ message: "Task not found" });
                }
                return res.status(status_codes_1.HTTP.OK).json({ message: "Task fetched successfully", data: task });
            }
            catch (error) {
                return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        };
        this.createTask = async (req, res) => {
            try {
                const { title, description } = req.body;
                const userId = req.user;
                console.log(userId);
                if (!title || !description) {
                    return res.status(status_codes_1.HTTP.BAD_GATEWAY).json({ message: "Inputs required" });
                }
                const newTask = new task_model_1.TaskModel({ userId: new mongoose_1.default.Types.ObjectId(userId), title, description, status: "pending" });
                await newTask.save();
                console.log(newTask);
                return res.status(status_codes_1.HTTP.CREATED).json({ data: newTask, message: "Task created successfully" });
            }
            catch (error) {
                return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        };
        this.updateTask = async (req, res) => {
            try {
                const { title, description } = req.body;
                const { id } = req.params;
                if (!id || !title || !description) {
                    return res.status(status_codes_1.HTTP.BAD_REQUEST).json({ message: "Inputs required" });
                }
                const taskToUpdate = await task_model_1.TaskModel.findById(id);
                if (!taskToUpdate) {
                    return res.status(status_codes_1.HTTP.NOT_FOUND).json({ message: "Task not found" });
                }
                taskToUpdate.title = title;
                taskToUpdate.description = description;
                await taskToUpdate.save();
                return res.status(status_codes_1.HTTP.OK).json({ message: "Task updated successfully" });
            }
            catch (error) {
                return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        };
        this.deleteTask = async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(status_codes_1.HTTP.BAD_REQUEST).json({ message: "Id required" });
                }
                const taskToDelete = await task_model_1.TaskModel.findByIdAndDelete(id);
                if (!taskToDelete) {
                    return res.status(status_codes_1.HTTP.NOT_FOUND).json({ message: "Task not deleted" });
                }
                return res.status(status_codes_1.HTTP.OK).json({ message: "Task deleted successfully" });
            }
            catch (error) {
                return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        };
        this.changeStatus = async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(status_codes_1.HTTP.BAD_REQUEST).json({ message: "Inputs required" });
                }
                const task = await task_model_1.TaskModel.findById(id);
                if (!task) {
                    return res.status(status_codes_1.HTTP.NOT_FOUND).json({ message: "Task not found" });
                }
                task.status = task.status === "completed" ? "pending" : "completed";
                await task.save();
                return res.status(status_codes_1.HTTP.OK).json({ message: "Task status updated successfully" });
            }
            catch (error) {
                return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        };
    }
}
exports.default = TaskController;
