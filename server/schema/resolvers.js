const { signToken } = require('../utils/auth');
const { User, Post, Comment } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            if (!username) {
                throw new Error('username is required!');
            }
            try {
                return await User.findOne( { username: username })
                .select('-__v -password');
            }
            catch (err) {
                throw new Error('Failed to get user!');
            }
        },
    },
    Mutation: {
        login: async (parent, { username, password }) => {
            if (!username || !password) {
                throw new Error('All fields are required!');
            }
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('No user found with this username');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);
            if (!token) {
                throw new Error('Error signing token');
            }
            return { token, user };
        },
        addUser: async (parent, {username, password}) => {
            if (!username || !password) {
                throw new Error('All fields are required!');
            }
            const user = await User.create({username, password});
            if (!user) {
                throw new Error('Failed to create new user!');
            }
            const token = signToken(user);
            if (!token) {
                throw new Error('Error signing token');
            }
            return { token, user };
        },
        addPost: async (parent, {userId, title, body, category}) => {
            if (!userId || !title || !body || !category) {
                throw new Error('All fields are required!');
            }
            const post = await Post.create({userId, title, body, category});
            if (!post) {
                throw new Error('Failed to create post!');
            }
            const user = User.findOneAndUpdate({ _id: userId }, { $addToSet: { posts: post._id } }, { new: true });
            if (!user) {
                throw new Error('Failed to add post to user!');
            }
            return { status: 'success', post };
        },
        addComment: async (parent, {postId, body, userId}) => {
            if (!postId || !body || !userId) {
                throw new Error('All fields are required!');
            }
            const comment = await Comment.create({postId, body, userId});
            if (!comment) {
                throw new Error('Failed to create comment!');
            }
            const post = Post.findOneAndUpdate({ _id: postId }, { $addToSet: { comments: comment._id } }, { new: true });
            if (!post) {
                throw new Error('Failed to add comment to post!');
            }
            const user = User.findOneAndUpdate({ _id: userId }, { $addToSet: { comments: comment._id } }, { new: true });
            if (!user) {
                throw new Error('Failed to add comment to user!');
            }
            return { status: 'success', comment };
        },
        addFriend: async (parent, {userId, friendId}) => {
            if (!userId || !friendId) {
                throw new Error('All fields are required!');
            }
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { friends: friendId } }, { new: true });
            if (!updatedUser) {
                throw new Error('Failed to add friend!');
            }
            return { status: 'success', updatedUser };
        },
        removePost: async (parent, {postId}) => {
            if (!postId) {
                throw new Error('postId is required!');
            }
            const post = await Post.findOneAndDelete({ _id: postId });
            if (!post) {
                throw new Error('Failed to delete post!');
            }
            return { status: 'success', post };
        },
    }
};

module.exports = resolvers;