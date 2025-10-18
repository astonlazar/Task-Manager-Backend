import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import { config } from "./config/env";
import appRoute from "./app";
import { Request, Response, NextFunction } from "express";
import cors from "cors";

dotenv.config()

const app = express();
const PORT = 5000;


// ✅ Allow a specific origin instead of '*'
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true,               // allow cookies/auth headers
}));

app.use(express.json());

app.use(appRoute)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url)
  next()
})

connectDB(config.mongoUri)

app.listen(PORT, () => {
  console.log('Listening on port 5000')
})