const express = require('express');
const withAuth = require('../middleware/auth')
const postController = require('../controllers/posts.controller')
const BlogPost = require('../models/BlogPost')
const Comment = require('../models/Comment')

const router = express.Router();

router.get('/posts', postController.getAllPosts)

router.get('/categoryNames', postController.getCategoryNames)

router.get('/:id', postController.getPostById)

router.post('/createpost', withAuth, postController.createPost)

router.post('/updatepost', withAuth, postController.updatePost)

router.post('/categories', postController.getCategories)

router.get('/category/:id', postController.getCategoryById)

//testing comments
router.post('/addcomment', async (req, res) => {
    let comment = new Comment({
        body: 'testing comment'
    })
    await comment.save();
    let post = await BlogPost.findById('5f8d904ce6c2dd6d5da1bdd0');
    post.comments.push(comment);
    post.save((err, doc) => {
        if(!err) {
            res.sendStatus(200);
        }
    });
})

router.post('/postwithcomment', async(req, res) => {
    BlogPost.findById('5f8d904ce6c2dd6d5da1bdd0')
    .populate('comments')
    .exec((err, doc) => {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.status(200).send(doc);
        }
    })
})

router.post('/addsubcomment', async(req, res) => {
    let comment = await Comment.findById('6023e3a05dd3074742b7f19f');
    let newcomment = new Comment({
        body: 'deeply-nested'
    })
    let deeplynested = new Comment({
        body: 'deeper and deeper'
    })
    await deeplynested.save();
    newcomment.replies.push(deeplynested);
    await newcomment.save();
    comment.replies.push(newcomment);
    await comment.save();
    res.sendStatus(200);
})

module.exports = router;