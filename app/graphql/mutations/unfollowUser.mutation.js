/**
 * Created by will on 15/11/17.
 */
import { gql } from 'react-apollo'

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userId: ID!) {
    unfollowUser(userId: $userId) {
      id
      username
    }
  }
`;

export default UNFOLLOW_USER_MUTATION;