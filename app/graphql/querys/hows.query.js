import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const HOWS_QUERY = gql`
  query hows($parentId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    hows(whatIfId: $parentId, first: $first, after: $after, last: $last, before: $before) {
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

export default HOWS_QUERY;
