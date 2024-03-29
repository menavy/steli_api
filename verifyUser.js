const jwt = require('jsonwebtoken');
const User = require('./models/User');

const verifyUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        req.user = verified;
        let user = await User.findById(req.user._id);
        if(!user) {
            res.status(400).send('Invalid Token');
        }
        next();
    } catch(err){
        res.status(400).send('Invalid Token');
    }
}

module.exports.verifyUser = verifyUser;