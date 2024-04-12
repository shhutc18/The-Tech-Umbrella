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
    }
};

module.exports = resolvers;