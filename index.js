const app = require('./app')
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.status(200).json({
        message: "working"
    })
})

app.listen(port, () => {
    console.log(`Server has been started on ${port}`)
})