"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (password) => {
    const hashed = await bcryptjs_1.default.hash(password, 12);
    return hashed;
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    const check = await bcryptjs_1.default.compare(password, hashedPassword);
    return check;
};
exports.comparePassword = comparePassword;
