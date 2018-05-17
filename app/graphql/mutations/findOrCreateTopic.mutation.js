/**
 * Created by will on 20/11/17.
 */
import gql from 'graphql-tag';

const FIND_OR_CREATE_TOPIC = gql`
  mutation findOrCreateTopic($name: String!) {
    findOrCreateTopic(name: $name) {
      id
      name
    }
  }
`;

export default FIND_OR_CREATE_TOPIC;