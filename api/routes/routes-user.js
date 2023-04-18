const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');

const cloudMulter = require('../middleware/cloudMulter');

const sendMail = require('../middleware/email');
const jwt_secret = process.env.JWT_SECRET;

router.get('/api/users', async (req, res, next) => {
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    console.log("get users ", userRequestBy);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    try {
        const {page = '1', size = '4'} = req.query;
        const result = await User.find()
                    .skip((Number(page)-1) * Number(size))
                    .limit(Number(size));
        const count = await User.count();
        return res.json({count, results: result});
    } catch (err) {
        next(err)
    }
});
router.get('/api/users/:id', async (req, res, next) => {
    console.log("get users/:id ");
    const {id} = req.params;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    let result;
    try {
        result = await User.findById(id);
        return res.json(result);
    } catch (err) {
        next(err)
    }
    
});
router.patch('/api/users/:id/avatar', cloudMulter.single('avatar'), async (req, res) => {
    console.log("patch users/:id/avatar ");
    const {id} = req.params;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }

    let result;
    try {
        if(req.file){
            const result = await User.updateOne({_id: id},{ avatar: req.file.path});

            console.log("result ",result);
        }
        result = await User.findById(id);
        return res.json(result);
    } catch (err) {
        next(err)
    }

});
router.post('/api/users', async (req, res, next) => {
    console.log("post users ");
    const body = req.body;
    const password = req.body.password;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    const saltRounds = 10;
    try {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err){
                return next(err);
            }
            bcrypt.hash(password, salt, async (err, hash) => {
                if(!err){
                    // Store hash in your password DB.
                    const newUser = new User({...body, password: hash});
                    const result = newUser.save();
                    if(result && body.email){
                        const msg = {
                            to: newUser.email,
                            subject: 'Registrazione avvenuta con successo',
                            text: 'Grazie per esserti registrato',
                            html: '<strong>Grazie per esserti registrato</strong>',
                        };
                        await sendMail(msg);
                    }
                    return res.status(201).json({result});            
                } else {
                    return next(err);
                }
            });
        });
    } catch (err) {
        next(err);
    }
    
});
router.put('/api/users/:id', async (req, res, next) => {
    console.log("put Users/:id ");
    const {id} = req.params;
    const body = req.body;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    try {
        const User = await User.findById(id);
        console.log("User=> ",user);
        const result = await User.updateOne({_id: user._id},{...body});
        console.log('modified ', result.modifiedCount)
        return res.json(result);
    } catch (err) {
        next(err)
    }
    
});
router.delete('/api/users/:id', async (req, res, next) => {
    console.log("delete users/:id ");
    const {id} = req.params;
    const userRequestId = req.body.id;
    const userRequestBy = await User.findById(userRequestId);
    if (!userRequestBy.isAdmin) {
        return next(new Error("No auth"));
    }
    try {
        const user = await User.findByIdAndDelete(id);
        return res.json(user);
    } catch (err) {
        next(err)
    }
});

router.post('/api/login', async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({email: username});
        if(user){
            const check = bcrypt.compare(password, user.password);
            if(check){
                const token = jwt.sign({ id: user._id, 
                                        nome: user.nome, 
                                        cognome: user.cognome,
                                        email: user.email,
                                        isAdmin: user.isAdmin,
                                    }, jwt_secret);
                return res.status(200).json({token});
            } else {
                next(new Error("Password is incorrect"))
            }
        } else {
            return next(new Error("User is incorrect"))
        }
    } catch (err) {
        next(err)
    }
});

module.exports = router;