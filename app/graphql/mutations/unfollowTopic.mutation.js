/**
 * Created by will on 20/05/18.
 */
import gql from 'graphql-tag';
const UNFOLLOW_TOPIC_MUTATION = gql`
  mutation unfollowTopic($topicId: ID!) {
    unfollowTopic(topicId: $topicId) {
      id
      followedByCurrentUser
    }
  }
`;

export default UNFOLLOW_TOPIC_MUTATION;