const jwt = require('jsonwebtoken');
const Admin = require('./models/Admin');

const verifyMain = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_ADMIN);
        console.log(verified);
        req.user = verified;
        let administrator = await Admin.findById(req.user._id);
        if(!administrator) {
            res.status(400).send('Invalid Token');
        }
        next();
    } catch(err){
        res.status(400).send('Invalid Token');
    }
}

module.exports.verifyMain = verifyMain;