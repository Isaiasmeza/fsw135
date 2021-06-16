const mongoose = require ("mongoose")
const Schema = mongoose.Schema
const inventorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("Inventory", inventorySchema)