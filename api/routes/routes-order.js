const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const User = require('../models/User');

router.get('/api/orders', async (req, res, next) => {
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    console.log("get orders ", userRequestBy);
    if (!userRequestBy.isAdmin && userRequestId != userRequestBy._id) {
        return next(new Error("No auth"));
    }
    try {
        const {page = '1', size = '4'} = req.query;
        let result;
        let count;
        if (userRequestBy.isAdmin) {
            result = await Order.find()
                        .skip((Number(page)-1) * Number(size))
                        .limit(Number(size));
            count = await Order.count();
        } else {
            result = await Order.find({customer: userRequestBy.email})
                        .skip((Number(page)-1) * Number(size))
                        .limit(Number(size));
            count = await Order.find({customer: userRequestBy.email}).count();
        }
        return res.json({count, results: result});
    } catch (err) {
        next(err)
    }
});
router.get('/api/orders/:id', async (req, res, next) => {
    console.log("get order/:id ");
    const {id} = req.params;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    // if (!userRequestBy.isAdmin) {
    //     return next(new Error("No auth"));
    // }
    let result;
    try {
        result = await Order.findById(id);
        return res.json(result);
    } catch (err) {
        next(err)
    }
    
});

router.post('/api/orders', async (req, res, next) => {
    console.log("post orders ");
    const body = req.body;
    const password = req.body.password;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    // if (!userRequestBy.isAdmin) {
    //     return next(new Error("No auth"));
    // }
    try {

        const newOrder = new Order({...body});
        const result = await newOrder.save();

        return res.status(201).json({result});            
    } catch (err) {
        next(err);
    }
    
});
router.put('/api/orders/:id', async (req, res, next) => {
    console.log("put orders/:id ");
    const {id} = req.params;
    const body = req.body;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    try {
        const order = await Order.findById(id);
        console.log("Order=> ",order);
        const result = await Order.updateOne({_id: order._id},{...body});
        console.log('modified ', result.modifiedCount)
        return res.json(result);
    } catch (err) {
        next(err)
    }
    
});
router.delete('/api/orders/:id', async (req, res, next) => {
    console.log("delete orders/:id ");
    const {id} = req.params;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    try {
        const order = await Order.findByIdAndDelete(id);
        return res.json(order);
    } catch (err) {
        next(err)
    }
});


module.exports = router;