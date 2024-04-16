const { signToken } = require('../utils/auth');
const { User, Post, Comment } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
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
        users: async () => {
            try {
                return await User.find()
                .select('-__v -password');
            }
            catch (err) {
                throw new Error('Failed to get users!');
            }
        },
        category: async () => {
            try {
                return await Post.find( {category: category });
            }
            catch (err) {
                throw new Error('Failed to get posts!');
            }
        },
        mostLikedPosts: async () => {
            try {
                return await Post.find()
                    .sort({ likes: -1 })
                    .limit(10);
            }
            catch (err) {
                throw new Error('Failed to get most liked posts!');
            }
        },
        post: async (parent, { _id }) => {
            if (!_id) {
                throw new Error('_id is required!');
            }
            try {
                return await Post.findOne( { _id: _id });
            }
            catch (err) {
                throw new Error('Failed to get post!');
            }
        },
        userPosts: async (parent, { userId }) => {
            if (!userId) {
                throw new Error('userId is required!');
            }
            try {
                return await Post.find( { userId: userId });
            }
            catch (err) {
                throw new Error('Failed to get user posts!');
            }
        },
        userComments: async (parent, { userId }) => {
            if (!userId) {
                throw new Error('userId is required!');
            }
            try {
                return await Comment.find( { userId: userId });
            }
            catch (err) {
                throw new Error('Failed to get user comments!');
            }
        },
        subscribedPosts: async (parent, { userId }) => {
            if (!userId) {
                throw new Error('userId is required!');
            }
            try {
                const user = await User.findOne( { _id: userId });
                if (!user) {
                    throw new Error('User not found!');
                }
                return await Post.find( { userId: { $in: user.friends } });
            }
            catch (err) {
                throw new Error('Failed to get subscribed posts!');
            }
        },
        anonymousBrowse: async () => {
            try {
                return await Post.find()
                    .select('-__v -userId')
                    .populate('comments')
                    .populate('likes')
                    .sort({ likes: -1 })
                    .limit(10);
            } catch (err) {
                throw new Error('Failed to get posts!');
            }
        }

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
        // TODO: Add email validation
        addUser: async (parent, {username, email, password}) => {
            if (!username || !password || !email) {
                throw new Error('All fields are required!');
            }
            const user = await User.create({username, email, password});
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
        removeUser: async (parent, {userId}) => {
            if (!userId) {
                throw new Error('userId is required!');
            }
            const user = await User.findOneAndDelete({ _id: userId });
            if (!user) {
                throw new Error('Failed to delete user!');
            }
            const posts = await Post.deleteMany({ userId });
            if ((!posts || posts.deletedCount === 0) && user.posts.length > 0) {
                throw new Error('Failed to delete user posts!');
            }
            const comments = await Comment.deleteMany({ userId });
            if ((!comments || comments.deletedCount === 0) && user.comments.length > 0) {
                throw new Error('Failed to delete user comments!');
            }
            const friends = await User.updateMany({ friends: userId }, { $pull: { friends: userId } });
            if ((!friends || friends.nModified === 0) && user.friends.length > 0) {
                throw new Error('Failed to remove user from friends!');
            }
            return { status: 'success', user };
        },
        removePost: async (parent, {postId}) => {
            if (!postId) {
                throw new Error('postId is required!');
            }
            const post = await Post.findOneAndDelete({ _id: postId });
            if (!post) {
                throw new Error('Failed to delete post!');
            }
            const user = await User.findOneAndUpdate({ _id: post.userId }, { $pull: { posts: postId } }, { new: true });
            if (!user) {
                throw new Error('Failed to remove post from user!');
            }
            return { status: 'success', post };
        },
        removeComment: async (parent, {commentId}) => {
            if (!commentId) {
                throw new Error('commentId is required!');
            }
            const comment = await Comment.findOneAndDelete({ _id: commentId });
            if (!comment) {
                throw new Error('Failed to delete comment!');
            }
            const post = await Post.findOneAndUpdate({ _id: comment.postId }, { $pull: { comments: commentId } }, { new: true });
            if (!post) {
                throw new Error('Failed to remove comment from post!');
            }
            const user = await User.findOneAndUpdate({ _id: comment.userId }, { $pull: { comments: commentId } }, { new: true });
            if (!user) {
                throw new Error('Failed to remove comment from user!');
            }
            return { status: 'success', comment };
        },
        removeFriend: async (parent, {userId, friendId}) => {
            if (!userId || !friendId) {
                throw new Error('All fields are required!');
            }
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $pull: { friends: friendId } }, { new: true });
            if (!updatedUser) {
                throw new Error('Failed to remove friend!');
            }
            return { status: 'success', updatedUser };
        },
        likePost: async (parent, {postId}) => {
            if (!postId) {
                throw new Error('postId is required!');
            }
            const post = await Post.findOneAndUpdate({ _id: postId }, { $inc: { likes: 1 } }, { new: true });
            if (!post) {
                throw new Error('Failed to like post!');
            }
            return { status: 'success', post };
        },
        likeComment: async (parent, {commentId}) => {
            if (!commentId) {
                throw new Error('commentId is required!');
            }
            const comment = await Comment.findOneAndUpdate({ _id: commentId }, { $inc: { likes: 1 } }, { new: true });
            if (!comment) {
                throw new Error('Failed to like comment!');
            }
            return { status: 'success', comment };
        },
    }
};

module.exports = resolvers;