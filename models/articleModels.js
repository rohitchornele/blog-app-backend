
import { Timestamp } from "mongodb";
import mongoose, { Schema } from "mongoose";


const articleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  title : {
    type: String,
    required: true,
    trim: true,
  },
  content : {
    type: String,
    required: true,
  },
  upvotes : {
    type : Number
  },
  comments : 
    [
      {
      postedBy :{
      // type: Schema.Types.ObjectId,
      // ref: "User",
      
      type: String,
    },
    commentText : {
      type: String,
    }
  }
  ],
  owner : {
    // type: Schema.Types.ObjectId,
    type: String,
    // ref: "User",
  }
},
{
  timestamps: true
}
);

export const Articles = mongoose.model("Articles", articleSchema);


