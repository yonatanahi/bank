const express = require('express')
const app = express()
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/bankDB', { useNewUrlParser: true , useUnifiedTopology: true })

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use('/', api)

const PORT = 3001
app.listen(process.env.PORT || PORT, function(){
    console.log(`running on port ${PORT}`);
    
})

