const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            return await User.findOne( { username: username })
            .select('-__v -password');
        },
    },
    Mutation: {
        login: async (parent, { username, password }) => {
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
            const user = await User.create({username, password});
            if (!user) {
                throw new Error('Something went wrong!');
            }
            const token = signToken(user);
            if (!token) {
                throw new Error('Error signing token');
            }
            return { token, user };
        },
        addPost: async (parent, {userId, title, body, category}) => {
            const post = await Post.create({userId, title, body, category});
            if (!post) {
                throw new Error('Something went wrong!');
            }
            return post;
        },
        addComment: async (parent, {postId, body, userId}) => {
            const comment = await Comment.create({postId, body, userId});
            if (!comment) {
                throw new Error('Something went wrong!');
            }
            return comment;
        },
        addFriend: async (parent, {userId, friendId}) => {
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { friends: friendId } }, { new: true });
            if (!updatedUser) {
                throw new Error('Something went wrong!');
            }
            return updatedUser;
        },
        
    }
};

module.exports = resolvers;