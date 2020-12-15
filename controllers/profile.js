const Users = require("../models/user");
const Profile = require("../models/profile");

const request = require('request');
const config = require('config');


exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.find().populate('user', ['name', 'avatar'])
        return res.status(201).json({
            length : profile.length,
            profile
        })
    } catch (error) {
        console.log(error);
        // return res.status(500).json({
        //     msg : "Server error"
        // })
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        await Profile.findOneAndRemove({user : req.user.id});

        await Users.findByIdAndRemove({_id : req.user.id});
        return res.status(201).json({
            msg : "User deleted"
        })
    } catch (error) {
        console.log(error);
        // return res.status(500).json({
        //     msg : "Server error"
        // })
    }
}

exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({user : req.params.user_id}).populate('user', ['name', 'avatar']);

        if( !profile ){
            return res.status(401).json({
                msg : "There is no profile for this user"
            })
        }

        return res.status(201).json({
            profile
        })

    } catch (error) {
        // console.log(error);
        if( error.kind === 'ObjectId' ){
            return res.status(401).json({
                msg : "There is no profile for this user"
            })
        }
        return res.status(500).json({
            msg : "Server error"
        })
    }
}

exports.myProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({user : req.user.id}).populate('user', ['name', 'avatar']);

        if( !profile ){
            return res.status(400).json({
                msg : "There is no profile for this user"
            })    
        }
        return res.status(201).json({
            profile
        })
    } catch (error) {
        return res.status(500).json({
            msg : "Server error"
        })
    }
}

exports.createProfile = async (req, res) => {
    try {
        const {company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin} = req.body;

        // build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio= bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;

        if(skills){
            profileFields.skills = skills.split(",").map(skill => skill.trim());
        }

        // build social objects
        profileFields.social = {}
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;


        
        let profile = await Profile.findOne({user : req.user.id});

        if( profile ){
            // update
            profile = await Profile.findOneAndUpdate({user : req.user.id}, {$set : profileFields}, {new : true});

            return res.status(201).json({
                profile
            })
        }

        // create
        profile = new Profile(profileFields);

        await profile.save()

        return res.status(201).json({
            profile
        })


    } catch (error) {
        console.log(error)
        // return res.status(500).json({
        //     msg : "Server error"
        // })
    }
}


exports.createExperience = async (req, res) => {
    try {
        const { title, company, location, from, to, current, description } = req.body;

        const newExp = {title, company, location, from, to, current, description};

        const profile = await Profile.findOne({user : req.user.id});
        profile.experience.unshift(newExp);

        await profile.save();

        return res.status(201).json(profile);

    } catch (error) {
        console.log(error)
        // return res.status(500).json({
        //     msg : "Server error"
        // })
    }
}


exports.deleteExperience = async (req, res) => {
    try {
        const profile = await Profile.findOne({user : req.user.id});

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save()

        return res.status(201).json(profile);
    } catch (error) {
        console.log(error)
        // return res.status(500).json({
        //     msg : "Server error"
        // })
    }
}



exports.createEducation = async (req, res) => {
    try {
        const { school, degree, fieldofstudy, from, to, current, description } = req.body;

        const newEdu = {school, degree, fieldofstudy, from, to, current, description};

        const profile = await Profile.findOne({user : req.user.id});
        profile.education.unshift(newEdu);

        await profile.save();

        return res.status(201).json(profile);

    } catch (error) {
        console.log(error)
        // return res.status(500).json({
        //     msg : "Server error"
        // })
    }
}


exports.deleteEducation = async (req, res) => {
    try {
        const profile = await Profile.findOne({user : req.user.id});

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save()

        return res.status(201).json(profile);
    } catch (error) {
        console.log(error)
        // return res.status(500).json({
        //     msg : "Server error"
        // })
    }
}


exports.getGithub = async (req, res) => {
    try {
        const options = {
            url : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubClientSecret")}`,
            method : "GET",
            headers : { 'user-agent': 'node.js' }
        };
        request(options, (error, response, body) => {
            if( error ) console.log(error);
            if( response.statusCode !== 200 ){
                return res.status(404).json({
                    msg : "Github profile not found"
                })
            }
            return res.status(404).json({
                profile : JSON.parse(body)
            })
        })
    } catch (error) {
        console.log(error)
        // return res.status(500).json({
        //     msg : "Server error"
        // })
    }
}