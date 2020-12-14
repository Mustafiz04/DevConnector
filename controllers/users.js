const Users = require("../models/user");
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


exports.signup = async (req, res) => {
    const {name , email, password} = req.body;
    try {
        let user = await Users.findOne({email});

        // already a user
        if( user ){
            return res.status(400).json({
                errors : [
                    {msg : "User already exist"}
                ]
            })
        }

        // get gravatar
        const avatar = gravatar.url(email, {
            s : '200',
            r : 'pg',
            d : "mm"
        })

        user = new Users({name, email, password, avatar})

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // jsonwebtoken
        const payload = {
            user : {
                id : user.id
            }
        }

        const token = jwt.sign(payload, config.get('jwttoken'), {expiresIn : 360000})

        // console.log(req.body);
        return res.status(201).json({
            success : true,
            data : {
                token,
                user
            }
        })
        // res.send("user created")
    } catch (error) {
        console.log(error);
        // return res.status(500).json({
        //     message : "Server Error"
        // })
    }
}


exports.signin = async (req, res) => {
    try {
        const user = await Users.findOne({email : req.body.email});

        if( !user ){
            return res.status(201).json({
                msg : "User not exits"
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if( !isMatch ){
            return res.status(201).json({
                msg : "Invalid credentials"
            })
        }


        const payload = {
            user : {
                id : user.id
            }
        }

        const token = jwt.sign(payload, config.get('jwttoken'), {expiresIn : 360000})

        // console.log(req.body);
        return res.status(201).json({
            success : true,
            data : {
                token,
                user
            }
        })

    } catch (error) {
        console.log(error);
        // return res.status(500).json({
        //     message : "Server Error"
        // })
    }
}