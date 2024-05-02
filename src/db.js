import dotenv from "dotenv";
import { mongoose } from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI 
const DB_NAME = process.env.DB_NAME


const connectDB = async () => {
  try {
    const connectionInstance =  await mongoose.connect(`${MONGODB_URI}`);
    console.log("Mongo DB Connected");
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;