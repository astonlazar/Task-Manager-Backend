import { Router } from "express";
import taskRoute from "./task.routes";
import userRoute from "./user.routes";
import { authenticate } from "../../../middlewares/auth-middleware";

const routes: Router = Router();

routes.use("/user", userRoute)

routes.use(authenticate)

routes.use('/tasks', taskRoute);

export default routes;