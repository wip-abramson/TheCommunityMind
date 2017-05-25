import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from './question.fragment';

const HOWS_QUERY = gql`
  query hows($parentId: Int!) {
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
