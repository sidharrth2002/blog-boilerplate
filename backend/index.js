const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
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
app.use(cors())

connectDB()

app.get('/', async (req, res) => {
    // let tags = ['the geek blog', 'middle school maths', 'basic math', 'higher level maths'];    
    // for (let i = 0; i < tags.length; i++) {
    //     let tagName = tags[i]
    //     let tag = new Tag({
    //         name: tagName
    //     })
    //     await tag.save();
    // }
    // let posts = [
    //     {
    //         title: 'How to file your income taxes',
    //         body: "In this article, we're going to go over the federal tax code to make it easier for you to file your taxes this year",
    //     }, 
    //     {
    //         title: 'Revision Tips',
    //         body: "In this article, we're going to go over the federal tax code to make it easier for you to file your taxes this year"
    //     },
    //     {
    //         title: 'How to make tasty lasagna',
    //         body: "In this article, we're going to go over the federal tax code to make it easier for you to file your taxes this year"
    //     }
    // ]
    // for (let i = 0; i< posts.length;i++) {
    //     let tempId, tempId2, tempId3;
    //     await Tag.findOne({ name: 'middle school maths' }, (err, doc) => {
    //         tempId = doc._id;
    //     });
    //     await Tag.findOne({ name: 'higher level maths' }, (err, doc) => {
    //         tempId2 = doc._id
    //     });
    //     await Tag.findOne({ name: 'basic math' }, (err, doc) => {
    //         tempId3 = doc._id
    //     });

    //     let tagsList = [tempId, tempId2, tempId3]
    //     let post = new Post({...posts[i]});
    //     post.tags = tagsList[i];
    //     // console.log(post);
    //     await post.save()
    // }
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

// app.get('/login', (req, res) => {
// })


app.listen(3001, () => {
    console.log("Running on Port 3001")
})