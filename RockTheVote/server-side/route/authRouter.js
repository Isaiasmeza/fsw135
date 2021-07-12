const express = require("expres")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")
const user = require("..models/user.js")

authRouter.post("signup", (req, res, next) => {
    usefindOne({ username: req.body.username.lowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (user) {
            res.status(403)
            return next(new Error("Username Taken"))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            return res.status(201).send({ token, user: savedUser })
        })
    })
})

authRouter.post("/login", (req, res, next) => {
    user.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (!user) {
            res.status(403)
            return next(new Error("Username or Password is incorrect"))
        }
        if (req.body.password !== user.password) {
            res.status(403)
            return next(new Error("Username or Password is incorrect"))
        }
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        return res.status(201).send({ token, user })
    })
})
module.exports = authRouter

