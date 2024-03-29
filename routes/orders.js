const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router();

const Order = require('../models/Order');
const { verifyUser } = require('../verifyUser');
const Drawing = require('../models/Drawing');


// добавление заказа для юзера

router.post('/add', verifyUser, async (req, res) => {

    const order = new Order({
        date: req.body.date,
        client: req.body.client,
        address: req.body.address,
        comment: req.body.comment,
        full: req.body.full,
        advance: req.body.advance,
        phone: req.body.phone,
        user_id: req.user._id,
        status: req.body.status
    });
    try {
        const savedOrder = await order.save();

        res.send(savedOrder);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

//получение заказов для юзера

router.get('/get/all', verifyUser, async (req, res) => {

    let orders = await Order.find({ user_id: req.user._id });

    res.send(orders);
});

//получение заказa для юзера

router.get('/get/:id', verifyUser, async (req, res) => {

    let order = await Order.findById( req.params.id );

    let draws = await Drawing.find({ order_id: req.params.id});

    res.send({order: order, draws: draws});
});

// редактирование заказа для юзера

router.patch('/edit/:id', verifyUser, async (req, res) => {

    try {
        await Order.findByIdAndUpdate(req.params.id, {
            date: req.body.date,
            client: req.body.client,
            address: req.body.address,
            comment: req.body.comment,
            full: req.body.full,
            advance: req.body.advance,
            phone: req.body.phone,
            user_id: req.user._id,
            status: req.body.status
        })
        res.send();
    } catch (err) {
        res.status(400).send({ message: err });
    }

});

module.exports = router;