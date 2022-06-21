const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('users', userSchema)
