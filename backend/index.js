const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { Passport, Strategy } = require('passport')
const passport = require('passport')
const connectDB = require('./config/db')
const Post = require('./models/BlogPost')
const Tag = require('./models/Tags')
const app = express()
require('dotenv').config()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

connectDB()

app.get('/', async (req, res) => {
    let tags = ['the geek blog', 'middle school maths', 'basic math', 'higher level maths'];    
    for (let i = 0; i < tags.length; i++) {
        let tagName = tags[i]
        let tag = new Tag({
            name: tagName
        })
        await tag.save();
    }
    let posts = [
        {
            title: 'How to file your income taxes',
            body: "In this article, we're going to go over the federal tax code to make it easier for you to file your taxes this year",
        }, 
        {
            title: 'Revision Tips',
            body: "In this article, we're going to go over the federal tax code to make it easier for you to file your taxes this year"
        },
        {
            title: 'How to make tasty lasagna',
            body: "In this article, we're going to go over the federal tax code to make it easier for you to file your taxes this year"
        }
    ]
    for (let i = 0; i< posts.length;i++) {
        let post = new Post(posts[i])
        await post.save()
    }
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
        res.json(data)
    })
})

app.post('/api/createpost', async(req, res) => {
    let postData = req.body;
    let newPost = new Post({...postData});
    await newPost.save();
    res.sendStatus(200);
})

// app.get('/login', (req, res) => {
// })


app.listen(3000, () => {
    console.log("Running on Port 3000")
})