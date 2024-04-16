const mongoose = require('mongoose');
const Comment = require('./Comment');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    comments: {
        type: [Comment.schema],
        required: false,
    },
    category: {
        type: String,
        reqired: true
    },
    likes: {
        type: Number,
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
