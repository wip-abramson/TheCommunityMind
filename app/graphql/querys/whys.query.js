import {gql} from'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const WHYS_QUERY = gql`
  query whys( $first: Int, $after: String, $last: Int, $before: String) {
  
    whys( first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id 
          question {
            ... QuestionFragment 
          }
          
        }
        cursor
      }
      
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default WHYS_QUERY;