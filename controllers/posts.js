import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    const { id } = req.params;
    try {
        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage);

    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    console.log("hit here")
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });

    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    console.log(post, "abc")
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}