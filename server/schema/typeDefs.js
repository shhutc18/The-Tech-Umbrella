const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        posts: [Post]
        comments: [Comment]
        friends: [ID]
    }
    type Post {
        _id: ID!
        userId: ID!
        title: String!
        body: String!
        category: String!
        comments: [Comment]
        likes: Int
    }
    type Comment {
        _id: ID!
        postId: ID!
        body: String!
        username: String!
        likes: Int
    }
    type Auth {
        token: ID!
        user: User!
    }
    type Query {
        users: [User]
        user(username: String!): User
        category(category: String!): [Post]
        mostLikedPosts: [Post]
        post(_id: ID!): Post
        userPosts(userId: ID!): [Post]
        userComments(userId: ID!): [Comment]
        subscribedPosts(userId: ID!): [Post]
        anonymousBrowse: [Post]
    }
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(userId: ID!, title: String!, body: String!, category: String!): User
        addComment(postId: ID!, body: String!, username: String!): Comment
        addFriend(userId: ID!, friendId: ID!): User
        removeUser(userId: ID!): User
        removePost(postId: ID!): Post
        removeComment(commentId: ID!): Comment
        removeFriend(userId: ID!, friendId: ID!): User
        likePost(postId: ID!): Post
        likeComment(commentId: ID!): Comment
    }
`;

module.exports = typeDefs;