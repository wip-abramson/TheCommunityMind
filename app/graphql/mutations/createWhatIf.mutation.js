import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const CREATE_WHATIF_MUTATION = gql`
  mutation createWhatIf($whyId: ID!, $question: String!) {
    createWhatIf(whyId: $whyId, question: $question) {
      id
      question {
        ... QuestionFragment
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default CREATE_WHATIF_MUTATION;