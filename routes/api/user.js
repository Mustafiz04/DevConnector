const express = require('express');
const router = express.Router();
const Users = require('../../models/user')
const {isLogin} = require('../../middleware/auth');

// @route   GET api/users
// @desc    get user data
// @access  Private
router.get('/', isLogin, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        
        return res.status(201).json({
            user
        })
    } catch (error) {
        return res.status(401).json({
            msg : "User not find"
        })
    }
})



module.exports = router;