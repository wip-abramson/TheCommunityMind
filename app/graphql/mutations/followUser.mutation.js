/**
 * Created by will on 15/11/17.
 */
import { gql } from 'react-apollo'

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userId: ID!) {
    followUser(id: $userId) {
      id
      username
      followersCount
      followedByCurrentUser
    }
  }
`;

export default FOLLOW_USER_MUTATION;