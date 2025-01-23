import postMessage from "../models/postMessage.js"
import mongoose from "mongoose";

export const getPosts=async (req,res)=>{

    try {
        const postMessages=await postMessage.find();
        console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost= async(req,res)=>{
    const post=req.body;

    const newPost=new postMessage(post)
    try {
        await newPost.save(); 
        res.status(201).json( newPost );
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const updatePost=async(req,res)=>{
       const {id:_id}=req.params;
       const post=req.body;

       if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with id');

     const updatePost= await postMessage.findByIdAndUpdate(_id,post,{new:true});
     res.json(updatePost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No post with that ID');

    try {
        await postMessage.findByIdAndDelete(id);
        console.log('DELETE');
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


export const likePost = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'No post with that ID' });
      
    }

    const post=await postMessage.findById(id);
    const updatePost=await postMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
    res.json(updatePost);
    
}
  