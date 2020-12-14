const express = require('express');
const router = express.Router();

const {signup, signin} = require('../../controllers/users');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('./../../middleware/validator/auth');


// @route   GET api/users/signup
// @desc    test routes
// @access  Public
router.post('/signup', validateSignupRequest, isRequestValidated, signup );

// @route   GET api/users/signin
// @desc    test routes
// @access  Public

router.post('/signin', validateSigninRequest, isRequestValidated, signin );



module.exports = router;