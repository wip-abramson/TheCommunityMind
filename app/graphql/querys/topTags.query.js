/**
 * Created by will on 21/11/17.
 */
import gql from 'graphql-tag';
const TOP_TAGS_QUERY = gql`
  query topTags {
    topTags {
      id
      name
    }
  }
`;

export default TOP_TAGS_QUERY;
