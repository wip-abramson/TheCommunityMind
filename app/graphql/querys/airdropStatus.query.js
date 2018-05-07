/**
 * Created by will on 07/05/18.
 */
import {gql} from 'react-apollo';

const AIRDROP_STATUS = gql`
  query airdropStatus($airdropId: String!) {
    checkAirdropStatus(airdropId: $airdropId) {
      id
      currentStatus
    }
  }
`;

export default AIRDROP_STATUS;