const typeDefs = `
    type User {
        _id: ID
        username: String,
        posts: [Post]
        comments: [Comment]
        friends: [ID]
    }
    type Post {
        _id: ID
        userId: String
        title: String
        body: String
        category: String
        comments: [Comment]
        likes: Int
    }
    type Comment {
        _id: ID
        postId: String
        body: String
        userId: String
        likes: Int
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        users: [User]
        user(username: String!): User
        posts: [Post]
        post(_id: ID!): Post
        comments: [Comment]
        comment(_id: ID!): Comment
    }
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!): Auth
        addPost(userId: ID!, title: String!, body: String!, category: String!): Post
        addComment(postId: ID!, body: String!, userId: ID!): Comment
        addFriend(userId: ID!, friendId: ID!): User
        removeUser(userId: ID!): User
        removePost(postId: ID!): Post
        removeComment(commentId: ID!): Comment
        removeFriend(userId: ID!, friendId: ID!): User
        likePost(postId: ID!): Post
        likeComment(commentId: ID!): Comment
        unlikePost(postId: ID!): Post
        unlikeComment(commentId: ID!): Comment
    }
`;

module.exports = typeDefs;