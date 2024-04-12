const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
    },
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    }
});

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;
