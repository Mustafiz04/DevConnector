const Users = require("../models/user");
const Profile = require("../models/profile");
const Posts = require("./../models/post");


exports.createPost = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select("-password");

        const newPost = {
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        }

        const post = new Posts(newPost);
        await post.save();

        return res.status(201).json({
            post
        })

    } catch (error) {
        console.log(error);
    }
}

exports.allPost = async (req, res) => {
    try {
        const posts = await Posts.find().sort({date : -1});

        return res.status(201).json({
            length : posts.length,
            posts
        })

    } catch (error) {
        console.log(error);
    }
}

exports.postById = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.post_id);

        if( !post ) {
            return res.status(404).json({
                msg : "Post not found"
            })    
        }

        return res.status(201).json({
            post
        })

    } catch (error) {
        console.log(error);
        if( error.kind === 'ObjectId' ){
            return res.status(404).json({
                msg : "Post not found"
            })
        }
    }
}


exports.deletePost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.post_id);

        if( !post ){
            return res.status(404).json({
                msg : "Post not found"
            })    
        }

        if( post.user.toString() !== req.user.id ){
            return res.status(401).json({
                msg : "User not authorized"
            })    
        }

        await post.remove();

        return res.status(201).json({
            msg : "Post deleted"
        })

    } catch (error) {
        console.log(error);
        if( error.kind === 'ObjectId' ){
            return res.status(404).json({
                msg : "Post not found"
            })
        }
    }
}