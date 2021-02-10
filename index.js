const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { Passport, Strategy } = require('passport')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const connectDB = require('./config/db')
const Post = require('./models/BlogPost')
const Tag = require('./models/Tags')
const User = require('./models/User')

const routes = require('./routes'); 

const withAuth = require('./middleware/auth')
const { response } = require('express')
const app = express()

require('dotenv').config()
const corsConfig = {
    credentials: true,
    origin: [`http://localhost:3000`, `https://localhost:3001`],
};

app.use(cors(corsConfig))

if (process.env.TYPE == 'development') {
    app.use(morgan())
}

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
connectDB()


app.use('/api', routes)

app.listen(3001, () => {
    console.log("Running on Port 3001")
})