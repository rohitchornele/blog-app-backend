import express from "express";
import { create, deleteArticle, downvote, getAll, getOne, postComment, update, upvote } from "../controller/articleController.js";




const route = express.Router();

route.post("/article/create", create);
route.get("/article/getall", getAll);
route.get("/article/:name/getone", getOne);
route.put("/article/:name/update", update);
route.delete("/article/:name/delete", deleteArticle);
route.put("/article/:name/upvote", upvote)
route.put("/article/:name/downvote", downvote)
route.post("/article/:name/comments", postComment)

export default route;