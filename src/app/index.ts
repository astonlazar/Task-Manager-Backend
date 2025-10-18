import { Router } from "express";
import v1Route from "./v1";

const appRoute: Router = Router();

appRoute.use('/api', v1Route);

export default appRoute;