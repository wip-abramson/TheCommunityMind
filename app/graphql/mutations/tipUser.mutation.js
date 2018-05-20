/**
 * Created by will on 20/05/18.
 */
import gql from 'graphql-tag';
const TIP_USER_MUTATION = gql`
  mutation tipUser($userId: ID!) {
    tipUser(id: $userId) {
      id
    }
  }
`;

export default TIP_USER_MUTATION;