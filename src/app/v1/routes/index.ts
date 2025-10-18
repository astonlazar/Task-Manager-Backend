import { Router } from "express";
import taskRoute from "./task.routes";

const routes: Router = Router();

routes.use('/tasks', taskRoute);

export default routes;