const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router();

const User = require('../models/User');
const { verifyMain } = require('../verifyMain');
const { verifyUser } = require('../verifyUser');

//получение юзера для юзера

router.get('/profile', verifyUser, async (req, res) => {

    let user = await User.findById(req.user._id);

    res.send(user);
});

// редактирование юзера для юзера

router.patch('/profile', verifyUser, async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.findByIdAndUpdate(req.user._id, {
            name: req.body.name,
            email: req.body.email,
            currency: req.body.currency,
            password: hashPassword
        })
        res.send();
    } catch (err) {
        res.status(400).send({ message: err });
    }

});

//получение всех юзеров для админа

router.get('/', verifyMain, async (req, res) => {

    let users = await User.find({ disabled: false });

    res.send(users);
});

// добавление юзера для админа

router.post('/', verifyMain, async (req, res) => {

    const mailExists = await User.findOne({ email: req.body.email });
    
    if (mailExists) {
        return res.status(400).send({ message: 'User exist' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        currency: req.body.currency,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();

        res.send(savedUser);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

//получение юзера для админа

router.get('/:id', verifyMain, async (req, res) => {

    let user = await User.findById(req.params.id);

    res.send(user);
});

// редактирование юзера для админа

router.patch('/:id', verifyMain, async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            currency: req.body.currency,
            password: hashPassword
        })
        res.send();
    } catch (err) {
        res.status(400).send({ message: err });
    }

});

// удаление юзера для админа

router.delete('/:id', verifyMain, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { disabled: true });
    res.send();
});

module.exports = router;