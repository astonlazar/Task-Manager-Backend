"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const validators_1 = require("../../../middlewares/validators");
const taskRoute = (0, express_1.Router)();
const taskController = new task_controller_1.default();
taskRoute.get("/", taskController.getAllTasks);
taskRoute.get("/:id", taskController.getOneTask);
taskRoute.post("/create-task", (0, validators_1.taskValidationRules)(), taskController.createTask);
taskRoute.put("/edit/:id", (0, validators_1.idParamRule)(), taskController.updateTask);
taskRoute.patch("/update-status/:id", (0, validators_1.idParamRule)(), taskController.changeStatus);
taskRoute.delete("/delete/:id", (0, validators_1.idParamRule)(), taskController.deleteTask);
exports.default = taskRoute;
