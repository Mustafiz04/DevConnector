const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('name').notEmpty().withMessage("First name is required"),
    check('email').isEmail().withMessage("Email is required"),
    check('password').isLength({min : 6}).withMessage("Password must be atleast 6 character long")
];

exports.validateSigninRequest = [
    check('email').isEmail().withMessage("Email is required"),
    check('password').exists().withMessage("Password is required")
];

exports.validateProfile = [
    check('status').not().isEmpty().withMessage("Status is required"),
    check('skills').not().isEmpty().withMessage("Skills is required"),
]

exports.validateExperience = [
    check('title').not().isEmpty().withMessage("Title is required"),
    check('company').not().isEmpty().withMessage("Company is required"),
    check('from').not().isEmpty().withMessage("From date is required")
]

exports.validateEducation = [
    check('school').not().isEmpty().withMessage("School is required"),
    check('degree').not().isEmpty().withMessage("Degree is required"),
    check('from').not().isEmpty().withMessage("From date is required"),
    check('fieldofstudy').not().isEmpty().withMessage("Field of study is required")
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if( errors.array().length > 0 ){
        return res.status(400).json({
            errors : errors.array()[0]
        })
    }
    next();
}