/**
 * Created by will on 06/12/17.
 */
import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const USER_WHYS_QUERY = gql`
  query userWhys($userId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    userWhys(userId: $userId, first: $first, after: $after, last: $last, before: $before) {
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

export default USER_WHYS_QUERY;