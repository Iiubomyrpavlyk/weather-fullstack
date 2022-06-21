const express = require('express')
const controller = require("../controllers/position.controller");

const passport = require('passport')

const router = express.Router()

router.get('/:categoryId', passport.authenticate('jwt', {sesstion: false}), controller.getByCategoryId)
router.post('/', passport.authenticate('jwt', {sesstion: false}), controller.create)
router.patch('/:id', passport.authenticate('jwt', {sesstion: false}), controller.update)
router.delete('/', passport.authenticate('jwt', {sesstion: false}), controller.remove)

module.exports = router