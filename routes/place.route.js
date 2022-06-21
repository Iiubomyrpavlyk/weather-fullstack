const express = require('express')
const controller = require("../controllers/place.controller");

const passport = require('passport')

const router = express.Router()

router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.delete('/', passport.authenticate('jwt', {session: false}), controller.remove)

module.exports = router