import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const CREATE_QUESTION_MUTATION = gql`
  mutation createQuestion($questionText: String!, $topicIds: [ID]!, $linkType: String, $questioningId: ID) {
    createQuestion(questionText: $questionText, topicIds: $topicIds, linkType: $linkType, questioningId: $questioningId) {
       id
    }
  }
`;

export default CREATE_QUESTION_MUTATION;