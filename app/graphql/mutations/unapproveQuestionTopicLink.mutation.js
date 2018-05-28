/**
 * Created by will on 20/05/18.
 */
import gql from 'graphql-tag';
const UNAPPROVE_QUESTION_TOPIC_LINK_MUTATION = gql`
  mutation unapproveQuestionTopicLink($topicId: ID!, $questionId: ID!) {
    unapproveQuestionTopicLink(topicId: $topicId, questionId: $questionId) {
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

export default UNAPPROVE_QUESTION_TOPIC_LINK_MUTATION;