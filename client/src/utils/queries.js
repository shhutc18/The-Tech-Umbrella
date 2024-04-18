import { gql } from '@apollo/client';

export const post = gql`
    query Query($id: ID!) {
        post(_id: $id) {
        _id
        body
        category
        comments {
            _id
            body
            likes
            userId
            postId
        }
        likes
        title
        userId
        }
    }
`;
export const users = gql`
query Users {
users {
    _id
    username
    posts {
      _id
      userId
      title
      body
      category
      comments {
        _id
        postId
        body
        userId
        likes
      }
      likes
    }
    comments {
      _id
      postId
      body
      userId
      likes
    }
    friends
  }
}
`;

export const User = gql`
query User($username: String!) {
    user(username: $username) {
      _id
      username
      posts {
        likes
        _id
        userId
        title
        body
        category
        comments {
          _id
          postId
          body
          userId
          likes
        }
      }
      comments {
        _id
        postId
        body
        userId
        likes
      }
      friends
    }
  }
`;

export const Category = gql`
query Category($category: String!) {
    category(category: $category) {
      _id
      userId
      title
      body
      category
      comments {
        _id
        postId
        body
        userId
        likes
      }
      likes
    }
  }
`;

export const MostLikedPosts = gql`
query MostLikedPosts {
    mostLikedPosts {
      _id
      userId
      title
      body
      category
      comments {
        _id
        postId
        body
        userId
        likes
      }
      likes
    }
  }
`;

export const userPosts = gql`
query UserPosts($userId: ID!) {
    userPosts(userId: $userId) {
      _id
      userId
      title
      body
      category
      comments {
        _id
        postId
        body
        userId
        likes
      }
      likes
    }
  }
`;

export const UserComments = gql`
query UserComments($userId: ID!) {
    userComments(userId: $userId) {
      _id
      postId
      likes
      userId
      body
    }
  }
`;

export const SubscribedPosts = gql`
query SubscribedPosts($userId: ID!) {
    subscribedPosts(userId: $userId) {
      _id
      userId
      title
      body
      category
      comments {
        _id
        body
        postId
        userId
        likes
      }
      likes
    }
  }
`;

export const AnonymousBrowse = gql`
query AnonymousBrowse {
    anonymousBrowse {
      _id
      userId
      title
      body
      category
      comments {
        _id
        postId
        body
        userId
        likes
      }
      likes
    }
  }
`;

