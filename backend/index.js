const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { Passport, Strategy } = require('passport')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const connectDB = require('./config/db')
const Post = require('./models/BlogPost')
const Tag = require('./models/Tags')
const User = require('./models/User')

const withAuth = require('./middleware/auth')
const app = express()
require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
connectDB()

app.get('/', async (req, res) => {
    res.send('New Posts Saved Successfully')
})

app.get('/api/posts', (req, res) => {
    Post.find((err, data) => {
        if(err) res.send(err)
        res.json(data)
    })
})

app.get('/api/post/:id', (req, res) => {
    let id = req.params.id;
    Post.findById(id, (err, data) => {
        if (err) res.sendStatus(404);
        res.json(data)
    })
})

app.post('/api/createpost', async(req, res) => {
    let postData = req.body;
    let newPost = new Post({...postData});
    await newPost.save();
    res.sendStatus(200);
})

app.get('/api/categories', async (req, res) => {
    let ids;
    await Tag.find((err, doc) => {
        if(err) console.log(err)
        res.send(doc)
    })
})

app.get('/api/category/:id', async (req, res) => {
    // let ids;
    // await Tag.find((err, doc) => {
    //     if(err) console.log(err)
    //     ids = doc.map((tag) => tag._id)
    // })
    // console.log(ids.length)
    let id = req.params.id;
    console.log(id)
    await Post.find({tags: { $in: [id] } }, (err, doc) => {
        console.log(doc)
        res.send(doc)
    })
})

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const user = new User({email, password});
    user.save((err) => {
        if (err) res.status(500);
        else res.status(200).send("You have been registered");
    })
})

app.post('/api/authenticate', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    User.findOne( { email }, (err, user) => {
        console.log(user)
        if(err) {
            console.log(err);
            res.status(500).json({
                error: 'Internal Error Boss.'
            });
        } else if (!user) {
            console.log('wrong')
            res.status(401).json({
                error: 'Incorrect email or password'
            })
        } else {
            user.isCorrectPassword(password, (err, same) => {
                if (err) {
                    res.status(500).json({
                        error: 'Internal error. Wait lah'
                    })
                } else if (!same) {
                    res.status(401).json({
                        error: 'Incorrect email or password'
                    })
                } else {
                    const payload = { email };
                    const token = jwt.sign(payload, process.env.BCRYPT_SECRET, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true }).sendStatus(200); 
                }
            })
        }
    })
})

app.get('/checkToken', withAuth, (req, res) => {
    res.sendStatus(200);
})

app.post('/api/addpost', withAuth, (req, res) => {
    res.send("Let's add a post");
})

app.listen(3001, () => {
    console.log("Running on Port 3001")
})