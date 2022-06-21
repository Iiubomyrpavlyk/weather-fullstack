const express = require('express')
const controller = require("../controllers/order.controller");

const passport = require('passport')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {sesstion: false}), controller.getAll)
router.post('/', passport.authenticate('jwt', {sesstion: false}), controller.create)

module.exports = router