const User = require('../models/position.model')
const errorHandler = require('../utils/errorHandler')

module.exports.updateUserImage = async (req, res) => {

}

module.exports.updateUserName = async (req, res) => {
	try {
		const user = await User.findOneAndUpdate({_id: req.user.id}, {$set: req.body}, {new: true})
		res.status(200).json(user)
	} catch (e) {
		errorHandler(res, e)
	}
}


