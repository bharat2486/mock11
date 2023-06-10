const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const userRouter = express.Router()
const bcrypt = require('bcrypt');



userRouter.get('/', async (req, res) => {
    try {
        let data = await userModel.find()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

userRouter.post('/register', async (req, res) => {
    let { email, password, name } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (hash) {
                let data = new userModel({ email, name, password: hash })
                await data.save()
                res.send('user has been created')

            } else {
                res.send('err.message')
            }
        });
    } catch (error) {
        res.send('error')
    }


})


userRouter.post('/login', async (req, res) => {
    let { email, password } = req.body




    try {
        let findEmail = await userModel.findOne({ email: email })
        if (findEmail) {
            bcrypt.compare(password, findEmail.password, async (err, result) => {
                if (result) {
                    jwt.sign({ userId: findEmail._id, userName: findEmail.name }, "bharat", function (err, token) {
                        if (token) {
                            res.send({ "msg": "user login successfull", token, userName:findEmail.name })
                        } else {
                            err.message
                        }
                    });
                }
            });
        } else {
            res.send('email is not registered')
        }

    } catch (error) {

    }
})


module.exports = userRouter

