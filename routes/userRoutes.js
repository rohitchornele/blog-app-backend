import express from "express";
import { createUser } from "../controller/userController.js";


const userRoutes = express.Router();

userRoutes.post("/user/create", createUser);


export default userRoutes;
