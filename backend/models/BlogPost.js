const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    // },
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
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tags'
    }]
})

module.exports = mongoose.model('Post', BlogPostSchema);