const mongoose = require("mongoose")
const Schema = mongoose.Schema
const todoSchema = new Schema({
    topic: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: String
    }
})
module.exports = mongoose.model("Todo", todoSchema)