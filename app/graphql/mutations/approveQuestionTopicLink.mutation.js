/**
 * Created by will on 20/05/18.
 */
import gql from 'graphql-tag';
const APPROVE_QUESTION_TOPIC_LINK_MUTATION = gql`
  mutation approveQuestionTopicLink($topicId: ID!, $questionId: ID!) {
    approveQuestionTopicLink(topicId: $topicId, questionId: $questionId) {
      question {
        id
      }
      topic {
        id
      }
      approvedByCurrentUser
      approval
    }
  }
`;

export default APPROVE_QUESTION_TOPIC_LINK_MUTATION;