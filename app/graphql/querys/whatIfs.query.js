import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const WHATIFS_QUERY = gql`
  query whatIfs($parentId: ID!) {
    whatIfs(whyId: $parentId) {
      id
      question {
        ... QuestionFragment
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default WHATIFS_QUERY;
