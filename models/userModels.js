import mongoose, { Schema } from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const userSchema = new Schema(
    {  
        fullName : {
            type : String,
            required : true,
            trim : true,
            index : true,
        },
        email: {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        avatar : {
            type : String,    //cloudinary url
        },
        password : {
            type : String,
            required : true,
        },
        refreshToken : {
            type : String,
        }
    },
    {
        timestamps: true
    }
);


export const User = mongoose.model("User", userSchema);