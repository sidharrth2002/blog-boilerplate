const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    replies: [this],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Comment', CommentSchema);