const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router();

const Admin = require('../models/Admin');

const User = require('../models/User');

router.post('/admin/login', async (req, res) => {

    console.log(req.body);

    //Check email exists
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send("WRONG_EMAIL");

    console.log(admin);

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if (!validPass) return res.status(400).send("WRONG_PASSWORD");

    //CREATE AND ASSIGN TOKEN
    const token = jwt.sign({ _id: admin._id, type: 0 }, process.env.TOKEN_ADMIN);
    res.header('auth-token', token).send({ token: token, admin: admin })
});


router.post('/user/login', async (req, res) => {

    console.log(req.body);

    //Check email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("WRONG_EMAIL");

    console.log(user);

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("WRONG_PASSWORD");

    //CREATE AND ASSIGN TOKEN
    const token = jwt.sign({ _id: user._id, type: 0 }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({ token: token, user: user })
});

// регистрация юзера

router.post('/user/registr', async (req, res) => {

    const mailExists = await User.findOne({ email: req.body.email });

    if (mailExists) {
        return res.status(400).send("USER_EXIST");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        currency: '1',
        password: hashPassword
    });

    try {

        const savedUser = await user.save();
            //CREATE AND ASSIGN TOKEN
        const token = jwt.sign({ _id: user._id, type: 0 }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({ token: token, user: savedUser })

    } catch (err) {
        res.status(400).send({ message: err });
    }
});

module.exports = router;