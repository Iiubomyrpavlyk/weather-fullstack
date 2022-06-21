const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({
        email: req.body.email
    })

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                name: candidate.name,
                email: candidate.email,
                userId: candidate._id
            }, require('../config/db.config').jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: "Password doesn't match"
            })
        }
    } else {
        res.status(404).json({
            message: "User is not registered"
        })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        console.log("User with typed email already exists")
        res.status(409).json({
            message: "User with typed email already exists"
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json({
                user
            })
        } catch (e) {
            errorHandler(res, e)
        }

    }

}