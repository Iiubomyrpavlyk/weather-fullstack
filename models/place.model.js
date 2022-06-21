const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const placeSchema = new Schema({
	lat: {
		type: Number,
		required: true
	},
	lng: {
		type: Number,
		required: true
	},
	city: {
		type: String,
		default: ''
	},
	temp: {
		type: Number,
		default: 0
	},
	minTemp: {
		type: Number,
		default: 0
	},
	maxTemp: {
		type: Number,
		default: 0
	},
	description: {
		type: String,
		default: ''
	},
	imageSrc: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	},
	user: {
		ref: 'users',
		type: Schema.Types.ObjectId
	}
})

module.exports = mongoose.model('places', placeSchema)
