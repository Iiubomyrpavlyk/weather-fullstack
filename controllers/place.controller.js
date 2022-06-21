const Place = require('../models/place.model')

const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
	try {
		console.log("PLACES GET ALL")
		const places = await Place.find({user: req.user.id})
		res.status(200).json(places)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.getById = async (req, res) => {
	try {
		const place = await Place.findOne(req.params.id)
		res.status(200).json(place)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.remove = async (req, res) => {
	try {
		await Place.remove(req.params.id)

		res.status(200).json({
			message: "Place was deleted successfully"
		})
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.create = async (req, res) => {
	console.log("CREATING")
	console.log(req.user)
	const place = new Place({
		lat: req.body.lat,
		lng: req.body.lng,
		city: req.body.city,
		temp: req.body.temp,
		minTemp: req.body.minTemp,
		maxTemp: req.body.maxTemp,
		description: req.body.description,
		date: new Date(),
		imageSrc: req.body.src ? req.body.src : '',
		user: req.user.id
	})

	console.log("place = " + place)

	try {
		await place.save()
		res.status(201).json(place)
	} catch (e) {
		errorHandler(res, e)
	}
}
