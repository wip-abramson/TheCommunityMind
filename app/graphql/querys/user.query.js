/**
 * Created by will on 14/11/17.
 */
import {gql} from 'react-apollo';
import QUESTION_FRAGMENT from '../fragments/question.fragment';


const USER_QUERY = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      id
      username
      whys {
        id
        question {
          ... QuestionFragment
        }
      }
      whatIfs {
        id
        question {
          ... QuestionFragment
        }
      }
      hows {
        id
        question {
          ... QuestionFragment
        }
      }
      staredQuestions {
        id
        question
      }
      followers {
        id
        username
      }
      follows {
        id
        username
      }
      followedByCurrentUser
    }
  }
  ${QUESTION_FRAGMENT}
`
export default USER_QUERY