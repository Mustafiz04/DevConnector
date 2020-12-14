const express = require('express');
const router = express.Router();
const {getProfile, myProfile, getProfileById, createProfile, deleteProfile, createExperience, deleteExperience, createEducation, deleteEducation, getGithub} = require("./../../controllers/profile");
const {validateProfile, validateExperience, validateEducation, isRequestValidated} = require('./../../middleware/validator/auth')
const {isLogin } = require("./../../middleware/auth");



// @route   GET api/profile/
// @desc    get all profile
// @access  Public
router.get('/', getProfile)

// @route   GET api/profile/user/:user_id
// @desc    get profile by id
// @access  Public
router.get('/user/:user_id', getProfileById)


// @route   GET api/profile/me
// @desc    get current user profile
// @access  Private
router.get('/me', isLogin, myProfile)

// @route   delete api/profile/
// @desc    Delete user profile
// @access  Private
router.delete("/deleteprofile", isLogin, deleteProfile )

// @route   GET api/profile/
// @desc    create or update user profile
// @access  Private
router.post("/", isLogin, validateProfile, isRequestValidated, createProfile);

// @route   GET api/profile/experience
// @desc    add profile experience
// @access  Private
router.put("/experience", isLogin, validateExperience, isRequestValidated, createExperience);

// @route   Delete api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private
router.delete("/experience/:exp_id", isLogin, deleteExperience);

// @route   GET api/profile/education
// @desc    add profile education
// @access  Private
router.put("/education", isLogin, validateEducation, isRequestValidated, createEducation);

// @route   Delete api/profile/education/:edu_id
// @desc    Delete profile education
// @access  Private
router.delete("/education/:edu_id", isLogin, deleteEducation);


router.get('/github/:username', getGithub)



module.exports = router;