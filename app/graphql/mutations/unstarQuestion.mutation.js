/**
 * Created by will on 15/11/17.
 */
import { gql } from 'react-apollo';

const UNSTAR_QUESTION_MUTATION = gql`
  mutation unstarQuestion($id: ID!) {
    unstarQuestion(id: $id){
       id
       questionText
       starredByCurrentUser
       stars
     }
   }
 `;

export default UNSTAR_QUESTION_MUTATION;