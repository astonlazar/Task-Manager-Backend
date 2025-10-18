import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import { config } from "./config/env";
import appRoute from "./app";
import { Request, Response, NextFunction } from "express";
import cors from "cors";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://task-manager-lwyd.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
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