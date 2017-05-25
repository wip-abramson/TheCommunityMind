import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from './question.fragment';

const CREATE_WHATIF_MUTATION = gql`
  mutation createWhatIf($userId: Int!, $whyId: Int, $question: String!) {
    createWhatIf(userId: $userId, whyId: $whyId, question: $question) {
      id
      question {
        ... QuestionFragment
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default CREATE_WHATIF_MUTATION;