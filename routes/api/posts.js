const express = require('express');
const router = express.Router();

const {isLogin} = require("./../../middleware/auth")
const {validatePost, isRequestValidated} = require('./../../middleware/validator/auth')
const {createPost, allPost, postById, deletePost} = require("./../../controllers/post");


// @route   POST api/posts
// @desc    test routes
// @access  Private
router.post('/', isLogin, validatePost, isRequestValidated, createPost);

// @route   GET api/posts
// @desc    get all posts
// @access  Private
router.get('/', isLogin, allPost);

// @route   GET api/posts/:post_id
// @desc    get post by id
// @access  Private
router.get('/:post_id', isLogin, postById);

// @route   Delete api/posts/:post_id
// @desc    delete post
// @access  Private
router.delete('/:post_id', isLogin, deletePost);



module.exports = router;