import { response } from "express";
import {  Articles } from "../models/articleModels.js";

// Creating API

// Create a new Article
export const create = async (req, res) => {
  try {
    const articleData = new Articles(req.body);

    if (!articleData) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    const savedData = await articleData.save();
    return res
      .status(200)
      .json({ msg: "Article Published Successfully", articleData });
    console.log(articleData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all Articles

export const getAll = async (req, res) => {
  try {
    const articleData = await Articles.find();
    if (!articleData) {
      return res.status(404).json({ msg: "Article Data not found" });
    }

    res.status(200).json(articleData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single Article based on Article name
export const getOne = async (req, res) => {
  try {
    const name = req.params.name;
    // const { uid } = req.user;

    const articleExist = await Articles.findOne({ name: name });

    if (!articleExist) {
      return res.status(404).json({ msg: "Article not found" });
    }

    // const upvoteIds = articleExist.upvoteIds || [];
    // articleExist.canUpvote = uid && !upvoteIds.include(uid);

    res.status(200).json(articleExist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const name = req.params.name;

    const articleExist = await Articles.findOne({ name: name });
    if (!articleExist) {
      return res.status(404).json({ msg: "Article not found" });
    }

    const updatedData = await Articles.updateOne({ name: name }, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const name = req.params.name;
    const articleExist = await Articles.findOne({ name: name });

    if (!articleExist) {
      return res.status(404).json({ msg: "Article not found" });
    }

    await Articles.deleteOne({ name: name });
    res.status(200).json({ msg: "Article Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Routes for Article Info

export const upvote = async (req, res) => {
  try {
    const name = req.params.name;

    const articleExist = await Articles.findOne({ name: name });
    if (!articleExist) {
      return res.status(404).json({ msg: "Article not found" });
    }

    await Articles.updateOne(
      { name: name },
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    const updatedData = await Articles.findOne({name : name})
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downvote = async (req, res) => {
  try {
    const name = req.params.name;

    const articleExist = await Articles.findOne({ name: name });
    if (!articleExist) {
      return res.status(404).json({ msg: "Article not found" });
    }

    if (articleExist.upvotes > 0) {
      const updatedData = await Articles.updateOne(
        { name: name },
        { $inc: { upvotes: -1 } },
        { new: true }
      );
      res.status(200).json(updatedData);
    } else {
        res.json({ msg: "Upvote is 0, can not update"});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const postComment = async (req, res) => {
  try {
    const name = req.params.name;
    const email = req.user

    const { postedBy, commentText} = req.body;

    const articleExist = await Articles.findOne({ name: name });
    if (!articleExist) {
      return res.status(404).json({ msg: "Article not found" });
    }

    await Articles.updateOne(
      { name: name },
      { $push: { comments: { postedBy, commentText } } }
    );

    const comment =  await Articles.findOne({name})
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};