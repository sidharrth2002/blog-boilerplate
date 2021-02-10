const express = require('express');
const withAuth = require('../middleware/auth')
const postController = require('../controllers/posts.controller')

const router = express.Router();

router.get('/posts', postController.getAllPosts)

router.get('/categories', postController.getCategoryNames)

router.get('/:id', postController.getPostById)

router.post('/createpost', withAuth, postController.createPost)

router.post('/updatepost', withAuth, postController.updatePost)

router.get('/categories', postController.getCategories)

router.get('/category/:id', postController.getCategoryById)

module.exports = router;