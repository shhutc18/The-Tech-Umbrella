import { gql } from '@apollo/client';

export const GET_POST = gql`
    query Query($id: ID!) {
        post(_id: $id) {
        _id
        body
        category
        comments {
            _id
            body
            likes
            username
            postId
        }
        likes
        title
        userId
        }
    }
`;
export const GET_USERS = gql`
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
        username
        likes
      }
      likes
    }
    comments {
      _id
      postId
      body
      username
      likes
    }
    friends
  }
}
`;

export const GET_USER = gql`
query Query($username: String!) {
  user(username: $username) {
    _id
    username
    email
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
        username
      }
      likes
      title
      userId
    }
    comments {
      body
      _id
      likes
      postId
      username
    }
  }
}
`;

export const GET_CATEGORY = gql`
query Query($category: String!) {
  category(category: $category) {
    _id
    body
    category
    comments {
      _id
      body
      likes
      postId
      username
    }
    likes
    title
    userId
  }
}
`;

export const GET_MOST_LIKED_POSTS = gql`
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
        username
        likes
      }
      likes
    }
  }
`;

export const GET_USERS_POSTS = gql`
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
        username
        likes
      }
      likes
    }
  }
`;

export const GET_USER_COMMENTS = gql`
query UserComments($userId: ID!) {
    userComments(userId: $userId) {
      _id
      postId
      likes
      username
      body
    }
  }
`;

export const GET_USER_SUBSCRIBED_POSTS = gql`
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
        username
        likes
      }
      likes
    }
  }
`;

export const GET_ANONYMOUS_POSTS = gql`
query Query {
  anonymousBrowse {
    _id
    body
    category
    comments {
      _id
      body
      likes
      postId
      username
    }
    likes
    title
    userId
  }
}
`;

