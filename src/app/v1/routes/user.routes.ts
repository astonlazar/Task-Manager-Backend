import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoute: Router = Router();
const userController = new UserController()

userRoute.post("/signup", userController.signup);
userRoute.post("/login", userController.login);

export default userRoute;