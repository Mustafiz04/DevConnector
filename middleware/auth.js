const jwt = require('jsonwebtoken');
const config = require('config');


exports.isLogin = async (req, res, next) => {
    try {
        // get token from header
        const token = req.header("x-auth-token");

        // if no token
        if( !token ){
            return res.status(401).json({
                msg : "You need to login"
            })
        }

        const decoded = await jwt.verify(token, config.get("jwttoken"))
        req.user = decoded.user;

        next();


    } catch (error) {
        return res.status(401).json({
            msg : "Token is not valid"
        })
    }
}