import mongoose from "mongoose";
import PostMessage from "../models/postModel.js";

// ---------------------------------------------------------------
export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ---------------------------------------------------------------
export const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = await PostMessage.create({...post ,creator : req.userId,createdAt : new Date().toISOString()});
    // await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    console.log("done");
    res.json(updatedPost);
  } catch (error) {
    console.log("error");
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const deletePost = await PostMessage.findByIdAndDelete(_id);
  console.log("deleted");
  res.json({ message: "deleted successfully", post: deletePost });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  //from middleware

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  //finding id of user in likes array
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like the post

    post.likes.push(req.userId);
  } else {
    //dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const likedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(likedPost);
};
