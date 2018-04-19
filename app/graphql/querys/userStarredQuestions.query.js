/**
 * Created by will on 06/12/17.
 */
import { gql } from 'react-apollo'
import QUESTION_FRAGMENT from '../fragments/question.fragment';


const USER_STARED_QUESTIONS_QUERY = gql`
  query userStarredQuestions($userId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    userStarredQuestions(userId: $userId, first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {

          ... QuestionFragment 

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

export default USER_STARED_QUESTIONS_QUERY;