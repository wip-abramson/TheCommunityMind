import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const WHATIFS_QUERY = gql`
  query whatIfs($parentId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    whatIfs(whyId: $parentId, first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id 
          question {
            ... QuestionFragment 
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export default WHATIFS_QUERY;
