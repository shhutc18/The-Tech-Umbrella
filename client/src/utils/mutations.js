import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                comments {
                    _id
                    body
                    likes
                    postId
                    userId
                }
                friends
                posts {
                    _id
                    body
                    category
                    comments {
                    _id
                    body
                    likes
                    postId
                    userId
                    }
                    likes
                    title
                    userId
                }
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                comments {
                    likes
                    _id
                    body
                    postId
                    userId
                }
                friends
                posts {
                    _id
                    body
                    category
                    comments {
                    _id
                    body
                    likes
                    postId
                    userId
                    }
                    likes
                    title
                    userId
                }
            }
        }
    }
`;

export const ADD_COMMENT = gql`
mutation Mutation($postId: ID!, $body: String!, $userId: ID!) {
  addComment(postId: $postId, body: $body, userId: $userId) {
    _id
    body
    likes
    postId
    userId
  }
}
`;

  export const ADD_FRIEND = gql`
  mutation Mutation($userId: ID!, $friendId: ID!) {
    addFriend(userId: $userId, friendId: $friendId) {
      _id
      comments {
        _id
        body
        likes
        postId
        userId
      }
      friends
      posts {
        _id
        body
        category
        comments {
          _id
          body
          likes
          postId
          userId
        }
        likes
        title
        userId
      }
      username
    }
  }
    `;

export const ADD_POST = gql`
mutation Mutation($userId: ID!, $title: String!, $body: String!, $category: String!) {
  addPost(userId: $userId, title: $title, body: $body, category: $category) {
    _id
    comments {
      _id
      body
      likes
      postId
      userId
    }
    email
    friends
    posts {
      _id
      body
      category
      comments {
        userId
        postId
        likes
        body
        _id
      }
      title
      likes
      userId
    }
    username
  }
}
`;

export const LIKE_COMMENT = gql`
mutation Mutation($commentId: ID!) {
    likeComment(commentId: $commentId) {
      _id
      body
      likes
      postId
      userId
    }
  }
    `;

export const LIKE_POST = gql`
mutation Mutation($postId: ID!) {
    likePost(postId: $postId) {
      _id
      body
      category
      comments {
        _id
        body
        likes
        postId
        userId
      }
      likes
      title
      userId
    }
  }
    `;

export const REMOVE_COMMENT = gql`
mutation Mutation($commentId: ID!) {
    removeComment(commentId: $commentId) {
      _id
      body
      likes
      postId
      userId
    }
  }
    `;

export const REMOVE_FRIEND = gql`
mutation Mutation($userId: ID!, $friendId: ID!) {
    removeFriend(userId: $userId, friendId: $friendId) {
      _id
      comments {
        _id
        body
        likes
        postId
        userId
      }
      friends
      posts {
        _id
        body
        category
        comments {
          _id
          body
          likes
          postId
          userId
        }
        likes
        title
        userId
      }
      username
    }
  }
    `;

export const REMOVE_POST = gql`
mutation Mutation($postId: ID!) {
    removePost(postId: $postId) {
      _id
      body
      category
      comments {
        _id
        body
        likes
        postId
        userId
      }
      likes
      title
      userId
    }
  } 
    `;

export const REMOVE_USER = gql`
mutation Mutation($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      comments {
        _id
        likes
        body
        postId
        userId
      }
      friends
      posts {
        _id
        body
        category
        comments {
          _id
          body
          likes
          postId
          userId
        }
        likes
        title
        userId
      }
      username
    }
  }
    `;
  
