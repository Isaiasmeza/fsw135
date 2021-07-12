const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")
require("dotenv").config()

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/rockthevote",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    },
    () => console.log("connect to DB"))

app.use("/api/", require("./route/issueRouter.js"))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['RS256'] }))
app.use("/apiauth", require("./routes/authRouter"))

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "Unauthorized Error") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.listen(9000, () => {
    console.log("server is running on Port: 9000")
})