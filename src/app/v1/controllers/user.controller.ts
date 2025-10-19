import { UserModel } from "../../../models/user.model";
import { comparePassword, hashPassword } from "../../../utils/hash-password";
import { generateToken } from "../../../utils/jwt";
import { HTTP } from "../../../utils/status-codes"
import { Request, Response } from "express"

export default class UserController {
  signup = async (req: Request, res: Response) => {
    try {
      const { fullName, username, password } = req.body;

      if (!fullName || !username || !password) {
        return res.status(HTTP.BAD_REQUEST).json({ message: "Inputs required" })
      }

      const usernameExistsCheck = await UserModel.findOne({ username });
      if (usernameExistsCheck) {
        return res.status(HTTP.CONFLICT).json({ message: "User already exists" })
      }

      const hashed = await hashPassword(password);

      const newUser = new UserModel({
        fullName,
        username,
        password: hashed
      })

      await newUser.save();

      const token = await generateToken({id: newUser._id});

      return res.status(HTTP.OK).json({ message: "User signup successful", token })
    } catch (error) {
      return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message })
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if(!username || !password) {
        return res.status(HTTP.BAD_REQUEST).json({ message: "Inputs required"})
      }

      const userCheck = await UserModel.findOne({username});
      if(!userCheck) {
        return res.status(HTTP.NOT_FOUND).json({message: "User not found"})
      }

      const checkPassword = comparePassword(password, userCheck.password);
      if(!checkPassword) {
        return res.status(HTTP.BAD_REQUEST).json({message: "Incorrect Password"})
      }

      const token = await generateToken({id: userCheck._id});
      if(!token) {
        return res.status(HTTP.INTERNAL_SERVER_ERROR).json({message: "Token not able to generate"})
      }
      return res.status(HTTP.OK).json({message: "User login successful", token})
    } catch (error) {
      return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message })
    }
  }
}