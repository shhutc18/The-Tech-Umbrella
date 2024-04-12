const mongoose = require('mongoose');
const Post = require('./Post')
const Comment = require('./Comment')

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true,
        unique: true,
    },
    email: {
        type: string,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: string,
        required: true,
    },
    posts:{
        type: [Post]
    },
    comments: {
        type: [Comment]
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;