const express = require('express');
const router = express.Router();


// @route   GET api/post
// @desc    test routes
// @access  Public
router.get('/', (req, res) => res.send("Posts routes"))



module.exports = router;