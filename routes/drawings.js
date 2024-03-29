const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router();

const Drawing = require('../models/Drawing');
const { verifyUser } = require('../verifyUser');

// добавление чертежа для юзера

router.post('/add', verifyUser, async (req, res) => {

    const drawing = new Drawing({
        info: req.body.info,
        name: req.body.name,
        perim: req.body.perim,
        volume: req.body.volume,
        comment: req.body.comment,
        price: req.body.price,
        prices: req.body.prices,
        material: req.body.material,
        order_id: req.body.order_id
    });
    try {
        const savedDrawing = await drawing.save();

        res.send(savedDrawing);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

//получение чертежей для заказа для юзера

router.get('/get/:id', verifyUser, async (req, res) => {

    let drawings = await Drawing.findById({ order_id: req.params.id });

    res.send(drawings);
});

//получение чертежa для заказа для юзера

router.get('/getOne/:id', verifyUser, async (req, res) => {

    let drawing = await Drawing.findById(req.params.id);

    res.send(drawing);
});

// редактирование чертежa для юзера

router.patch('/edit/:id', verifyUser, async (req, res) => {

    try {
        await Drawing.findByIdAndUpdate(req.params.id, {
            info: req.body.info,
            name: req.body.name,
            perim: req.body.perim,
            volume: req.body.volume,
            comment: req.body.comment,
            price: req.body.price,
            prices: req.body.prices,
            material: req.body.material,
            order_id: req.body.order_id
        })
        res.send();
    } catch (err) {
        res.status(400).send({ message: err });
    }

});

// удаление чертежa для админа

router.delete('/:id', verifyUser, async (req, res) => {
    await Drawing.findByIdAndUpdate(req.params.id, { disabled: true });
    res.send();
});

module.exports = router;