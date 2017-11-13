import {gql} from'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const WHYS_QUERY = gql`
  query whys {
    whys {
      id 
      question {
        ... QuestionFragment 
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default WHYS_QUERY;