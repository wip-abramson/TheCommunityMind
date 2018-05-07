/**
 * Created by will on 15/11/17.
 */
import gql from 'graphql-tag';
const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userId: ID!) {
    unfollowUser(id: $userId) {
      id
      username
      followersCount
      followedByCurrentUser
    }
  }
`;

export default UNFOLLOW_USER_MUTATION;