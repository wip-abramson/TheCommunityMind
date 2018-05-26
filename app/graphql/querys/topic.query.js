/**
 * Created by will on 23/05/18.
 */
import gql from 'graphql-tag';
import QUESTION_FRAGMENT from '../fragments/question.fragment';

const TOPIC_QUERY = gql`
  query topic($topicId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    topic(topicId: $topicId) {
      id
      name
      numberOfFollowers
      followedByCurrentUser
      questionsCount
      questions(first: $first, after: $after, last: $last, before: $before) {
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
  }
 ${QUESTION_FRAGMENT}
`;

export default TOPIC_QUERY;