const mongoose = require('mongoose');
const Post = require('./Post')
const Comment = require('./Comment')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    posts:{
        type: [Post.schema]
    },
    comments: {
        type: [Comment.schema]
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;