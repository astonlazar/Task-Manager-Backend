"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.USER_DB_REF = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
    },
    profilePicture: {
        type: String,
        required: true,
    }
}, { timestamps: true });
exports.USER_DB_REF = "users";
exports.userModel = mongoose_1.default.model(exports.USER_DB_REF, userSchema);
