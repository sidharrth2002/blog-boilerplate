const express = require('express');
const withAuth = require('../middleware/auth')
const Post = require('../models/BlogPost')
const Tag = require('../models/Tags')
const User = require('../models/User')

const router = express.Router();

router.get('/posts', (req, res) => {
    Post.find((err, data) => {
        if(err) res.send(err)
        res.json(data)
    })
})

router.get('/categories', async (req, res) => {
    console.log('I fire')
    let ids;
    await Tag.find((err, doc) => {
        if(err) console.log(err)
        res.send(doc)
    })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Post.findById(id, (err, data) => {
        if (err) res.sendStatus(404);
        res.json(data)
    })
})

router.post('/createpost', withAuth, async(req, res) => {
    let postData = {};
    postData.title = req.body.title;
    postData.body = req.body.htmlData;

    let newPost = new Post({...postData});

    console.log(newPost);
    newPost.save((err, doc) => {
        if(err) {
            console.log(err)
        } else {
            res.status(200).send(doc);
        }
    })
})

router.get('/category/:id', async (req, res) => {
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

module.exports = router;