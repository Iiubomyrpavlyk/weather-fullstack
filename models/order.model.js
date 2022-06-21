const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: String,
        required: true,
    },
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('orders', orderSchema)
