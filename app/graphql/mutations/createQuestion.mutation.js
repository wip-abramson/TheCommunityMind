import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const CREATE_QUESTION_MUTATION = gql`
  mutation createQuestion($questionText: String!, $parentId: ID) {
    createQuestion(questionText: $questionText, parentId: $parentId) {

      ... QuestionFragment
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default CREATE_QUESTION_MUTATION;