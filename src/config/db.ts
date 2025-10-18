import mongoose from "mongoose";

const connectDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB