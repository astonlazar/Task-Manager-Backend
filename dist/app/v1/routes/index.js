"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_routes_1 = __importDefault(require("./task.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const routes = (0, express_1.Router)();
routes.use("/user", user_routes_1.default);
routes.use(auth_middleware_1.authenticate);
routes.use('/tasks', task_routes_1.default);
exports.default = routes;
