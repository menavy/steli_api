const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router();

const Admin = require('../models/Admin');
const { verifyMain } = require('../verifyMain');

//получение всех админов

router.get('/', verifyMain, async (req, res) => {

    let admins = await Admin.find({disabled: false});

    res.send(admins);
});

//получение админа

router.get('/:id', verifyMain, async (req, res) => {

    let admin = await Admin.findById(req.params.id);

    res.send(admin);
});

// добавление админа

router.post('/', async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedAdmin = await admin.save();

        res.send(savedAdmin);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

// редактирование админа

router.patch('/:id', verifyMain, async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await Admin.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
        res.send();
    } catch (err) {
        res.status(400).send({ message: err });
    }

});

// удаление админа

router.delete('/:id', verifyMain, async (req, res) => {
    await Admin.findByIdAndUpdate(req.params.id, { disabled: true });
    res.send();
});

module.exports = router;