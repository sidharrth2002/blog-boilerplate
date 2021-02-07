const mongoose = require('mongoose')

const TagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    posts: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }]
})

module.exports = mongoose.model('Tag', TagsSchema);

// enum: ['the geek blog', 'middle school maths', 'basic math', 'higher level maths']