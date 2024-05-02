import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import route from "../routes/articleRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import connectDB from "./db.js";
import admin from 'firebase-admin';
import fs from 'fs';
// import { credetials } from '../credentials.json'


const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});


dotenv.config();
export const app = express();
app.use(express.json());
app.use(cors());



// app.use(async (req, res, next) => {
//   const { authToken } = req.headers;

//   if(authToken){
//     try {
//       req.user = await admin.auth().verifyIdToken(authToken);
//     } catch (error) {
//       res.sendStatus(400);
//     }
//   }

//   next();
// });



const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at 8000, and connected to MongoDB`);
    });

    app.on("error", (error) => {
      throw error;
    });
  })
  .catch((err) => {
    console.log("Mongo DB Connection Failed !!! ", err);
  });

app.use("/api", route);
app.use("/api", userRoutes);
