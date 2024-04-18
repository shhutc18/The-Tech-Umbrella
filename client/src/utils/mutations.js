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