/**
 * Created by will on 15/11/17.
 */
import { gql } from 'react-apollo'

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userId: ID!) {
    followUser(userId: $userId) {
      id
      username
    }
  }
`;

export default FOLLOW_USER_MUTATION;