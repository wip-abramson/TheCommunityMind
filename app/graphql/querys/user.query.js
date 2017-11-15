/**
 * Created by will on 14/11/17.
 */
import {gql} from 'react-apollo';

const USER_QUERY = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      id
      username
      questions {
        id
        question
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
    }
  }
`
export default USER_QUERY