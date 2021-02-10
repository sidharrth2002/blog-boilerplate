const Post = require('../models/BlogPost')
const Tag = require('../models/Tags')
const User = require('../models/User')

module.exports = {
    getAllPosts(req, res) {
        Post.find((err, data) => {
            if(err) res.send(err)
            res.json(data)
        })
    },
    getPostById(req, res) {
        let id = req.params.id;
        Post.findById(id, (err, data) => {
            if (err) res.sendStatus(404);
            res.json(data)
        })
    },
    createPost(req, res) {
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
    },
    updatePost(req, res) {
        let updateObj = {};
        if(!req.body._id || !req.body.title || !req.body.body) {
            res.sendStatus(204);
        }
        updateObj.title = req.body.title;
        updateObj.body = req.body.postHTML;
        console.log(updateObj);
        Post.findByIdAndUpdate(req.body._id, updateObj, (err, doc) => {
            if(err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log(doc);
                res.status(200);
            }
        });
    },
    getCategories(req, res) {
        Tag.find()
        .populate({
            path: 'posts',
            populate: {
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'comments.replies',
                }
            }
        })
        .exec((err, doc) => {
            if(err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.status(200).send(doc);
            }
        })
    },
    getCategoryById(req, res) {
        Tag.findById(req.params.id)
        .populate('posts')
        .exec((err, doc) => {
            if(err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.status(200).send(doc);
            }
        })
    },
    getCategoryNames(req, res) {
        Tag.find((err, doc) => {
            if(err) console.log(err)
            else {
                res.send(doc)
            }
        })
    }
}