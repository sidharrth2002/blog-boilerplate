const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }]
})

module.exports = mongoose.model('Post', BlogPostSchema);