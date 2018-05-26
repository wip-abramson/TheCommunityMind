/**
 * Created by will on 23/05/18.
 */
import gql from 'graphql-tag';

const FULL_USER_QUERY = gql`
  query user($userId: ID!) {
    user(id: $userId) {
          id
          username
          questionsAskedCount
          questionsStarredCount
          followersCount
          followsCount
          followedByCurrentUser
    }
  }
`;
export default FULL_USER_QUERY