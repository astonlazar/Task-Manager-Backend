import { Router } from "express";
import routes from "./routes";

const v1Route: Router = Router();

v1Route.use("/v1", routes);

export default v1Route;