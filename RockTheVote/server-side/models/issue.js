const mongoose = require("mongoose")
const Schema = mongoose.Schema
const issueSchema = new Schema({
    topic: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("issue", issueSchema)