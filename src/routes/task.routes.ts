import { Router } from "express";
import TaskController from "../app/v1/controllers/task.controller";
import { idParamRule, taskValidationRules } from "../middlewares/validators"

const taskRoute: Router = Router();
const taskController = new TaskController()

taskRoute.get("/", taskController.getAllTasks)
taskRoute.get("/:id", taskController.getOneTask)
taskRoute.post("/create-task", taskValidationRules(), taskController.createTask);
taskRoute.put("/edit/:id", idParamRule(), taskController.updateTask);
taskRoute.patch("/update-status/:id", idParamRule(), taskController.changeStatus);
taskRoute.delete("/delete/:id", idParamRule(), taskController.deleteTask);

export default taskRoute;