/**
 * Created by will on 02/03/18.
 */
import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const QUESTIONS_QUERY = gql`
  query questions($parentId: Int,$first: Int, $after: String, $last: Int, $before: String) {
    questions(parentId: $parentId, first: $first, after: $after, last: $last, before: $before) {
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

export default QUESTIONS_QUERY;
