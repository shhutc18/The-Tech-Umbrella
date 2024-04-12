const typeDefs = `
    type User {
        _id: ID
        username: String,
        posts: [Post]
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
`

module.exports = typeDefs;