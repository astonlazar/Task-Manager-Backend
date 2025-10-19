"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../../models/user.model");
const hash_password_1 = require("../../../utils/hash-password");
const jwt_1 = require("../../../utils/jwt");
const status_codes_1 = require("../../../utils/status-codes");
class UserController {
    constructor() {
        this.signup = async (req, res) => {
            try {
                const { fullName, username, password } = req.body;
                if (!fullName || !username || !password) {
                    return res.status(status_codes_1.HTTP.BAD_REQUEST).json({ message: "Inputs required" });
                }
                const usernameExistsCheck = await user_model_1.UserModel.findOne({ username });
                if (usernameExistsCheck) {
                    return res.status(status_codes_1.HTTP.CONFLICT).json({ message: "User already exists" });
                }
                const hashed = await (0, hash_password_1.hashPassword)(password);
                const newUser = new user_model_1.UserModel({
                    fullName,
                    username,
                    password: hashed
                });
                await newUser.save();
                const token = await (0, jwt_1.generateToken)({ id: newUser._id });
                return res.status(status_codes_1.HTTP.OK).json({ message: "User signup successful", token });
            }
            catch (error) {
                return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const { username, password } = req.body;
                if (!username || !password) {
                    return res.status(status_codes_1.HTTP.BAD_REQUEST).json({ message: "Inputs required" });
                }
                const userCheck = await user_model_1.UserModel.findOne({ username });
                if (!userCheck) {
                    return res.status(status_codes_1.HTTP.NOT_FOUND).json({ message: "User not found" });
                }
                const checkPassword = (0, hash_password_1.comparePassword)(password, userCheck.password);
                if (!checkPassword) {
                    return res.status(status_codes_1.HTTP.BAD_REQUEST).json({ message: "Incorrect Password" });
                }
                const token = await (0, jwt_1.generateToken)({ id: userCheck._id });
                if (!token) {
                    return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ message: "Token not able to generate" });
                }
                return res.status(status_codes_1.HTTP.OK).json({ message: "User login successful", token });
            }
            catch (error) {
                return res.status(status_codes_1.HTTP.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        };
    }
}
exports.default = UserController;
