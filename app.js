const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/auth.route')
const analyticsRoutes = require('./routes/analytics.route')
const categoryRoutes = require('./routes/category.route')
const orderRoutes = require('./routes/order.route')
const positionRoutes = require('./routes/position.route')
const placeRoutes = require('./routes/place.route')

const config = require('./config/db.config')

mongoose.connect(config.MONGO_URI)
    .then(() => {console.log("MongoDB | Connected")})
    .catch(error => {console.log(error)})

const app = express()

app.use(passport.initialize())
require('./middlewares/passport')(passport)

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/place', placeRoutes)

module.exports = app
