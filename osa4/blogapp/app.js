const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const cors = require('cors')



console.log('CONNECTING TO', config.dburl)

mongoose.connect(config.dburl, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(cors())
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app