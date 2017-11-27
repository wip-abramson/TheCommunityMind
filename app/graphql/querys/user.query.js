/**
 * Created by will on 14/11/17.
 */
import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';


const USER_QUERY = gql`
  query user($userId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
    user(id: $userId) {
      id
      username
      whys {
        edges {
          node {
            id 
            question {
              ... QuestionFragment 
            }
          }
        }
      }
      whatIfs {
        edges {
          node {
            id 
            question {
              ... QuestionFragment 
            }
          }
        }
      }
      hows {
        edges {
          node {
            id 
            question {
              ... QuestionFragment 
            }
          }
        }
      }
      questions(first: $first, after: $after, last: $last, before: $before) {
        edges {
          node {
            id 
            question {
              ... QuestionFragment 
            }
          }
        }
      }
      staredQuestions(first: $first, after: $after, last: $last, before: $before) {
        edges {
          node {
            id 
            question {
              ... QuestionFragment 
            }
          }
        }
      }
      followsCount
      followersCount
      followedByCurrentUser
    }
  }
  ${QUESTION_FRAGMENT}
`
export default USER_QUERY