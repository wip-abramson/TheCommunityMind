/**
 * Created by will on 20/11/17.
 */
import { gql } from 'react-apollo';

const FIND_OR_CREATE_THREAD = gql`
  mutation findOrCreateTag($name: String!) {
    findOrCreateTag(name: $name) {
      id
      name
    }
  }
`;

export default FIND_OR_CREATE_THREAD;