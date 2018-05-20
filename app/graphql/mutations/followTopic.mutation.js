/**
 * Created by will on 20/05/18.
 */
import gql from 'graphql-tag';
const FOLLOW_TOPIC_MUTATION = gql`
  mutation followTopic($topicId: ID!) {
    followTopic(topicId: $topicId) {
      id
      followedByCurrentUser
    }
  }
`;

export default FOLLOW_TOPIC_MUTATION;