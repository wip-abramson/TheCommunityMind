import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from './question.fragment';

const CREATE_HOW_MUTATION = gql`
  mutation createHow($userId: Int!, $whatIfId: Int!, $question: String!) {
    createHow(userId: $userId, whatIfId: $whatIfId, question: $question) {
      id
      question {
        ... QuestionFragment
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default CREATE_HOW_MUTATION;