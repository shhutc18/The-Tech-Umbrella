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