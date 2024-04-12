const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
    },
});

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;