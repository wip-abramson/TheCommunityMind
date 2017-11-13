import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const HOWS_QUERY = gql`
  query hows($parentId: ID!) {
    hows(whatIfId: $parentId) {
      id
      question {
        ... QuestionFragment
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default HOWS_QUERY;
