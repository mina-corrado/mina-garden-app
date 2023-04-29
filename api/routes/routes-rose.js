const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Rose = require('../models/Rose');
const User = require('../models/User');

const cloudMulter = require('../middleware/cloudMulter');

router.get('/api/roses', async (req, res, next) => {
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    console.log("get roses ", userRequestBy);
    // if (!userRequestBy.isAdmin) {
    //     return next(new Error("No auth"));
    // }
    try {
        const {page = '1', size = '4'} = req.query;
        const result = await Rose.find()
                    .skip((Number(page)-1) * Number(size))
                    .limit(Number(size));
        const count = await Rose.count();
        return res.json({count, results: result});
    } catch (err) {
        next(err)
    }
});
router.get('/api/roses/:id', async (req, res, next) => {
    console.log("get roses/:id ");
    const {id} = req.params;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    // if (!userRequestBy.isAdmin) {
    //     return next(new Error("No auth"));
    // }
    let result;
    try {
        result = await Rose.findById(id);
        return res.json(result);
    } catch (err) {
        next(err)
    }
    
});
router.patch('/api/roses/:id/photos', cloudMulter.array('photos', 12), async (req, res, next) => {
    const {id} = req.params;
    const userRequestId = req.userid;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy || !userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }

    let result;
    try {
        if(req.file){
            const photosCloud = [req.file.path];
            // console.log(`CLOUD one ${photosCloud}`);
            const result = await Rose.updateOne({_id: id},{ photos: photosCloud});

            console.log("result ",result);
        } else if(req.files && req.files.length > 0){
            const photosCloud = req.files.map(file => file.path);
            // console.log(`CLOUD more ${photosCloud}`);
            const result = await Rose.updateOne({_id: id},{ photos: photosCloud});

            console.log("result ",result);
        }
        
        result = await Rose.findById(id);
        return res.json(result);
    } catch (err) {
        next(err)
    }

});
router.post('/api/roses', async (req, res, next) => {
    console.log("post roses ");
    const body = req.body;
    const password = req.body.password;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    try {

        const newRose = new Rose({...body});
        const result = await newRose.save();

        return res.status(201).json({result});            
    } catch (err) {
        next(err);
    }
    
});
router.put('/api/roses/:id', async (req, res, next) => {
    console.log("put Roses/:id ");
    const {id} = req.params;
    const body = req.body;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    try {
        const rose = await Rose.findById(id);
        console.log("Rose=> ",rose);
        const result = await Rose.updateOne({_id: rose._id},{...body});
        console.log('modified ', result.modifiedCount)
        return res.json(result);
    } catch (err) {
        next(err)
    }
    
});
router.delete('/api/roses/:id', async (req, res, next) => {
    console.log("delete roses/:id ");
    const {id} = req.params;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    try {
        const rose = await Rose.findByIdAndDelete(id);
        return res.json(rose);
    } catch (err) {
        next(err)
    }
});


module.exports = router;