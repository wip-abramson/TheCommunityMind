/**
 * Created by will on 15/11/17.
 */
import gql from 'graphql-tag';
const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userId: ID!) {
    followUser(id: $userId) {
      id
      followedByCurrentUser
    }
  }
`;

export default FOLLOW_USER_MUTATION;