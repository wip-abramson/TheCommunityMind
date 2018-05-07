/**
 * Created by will on 07/05/18.
 */
import ostUserQueries from '../ost/ostUserQueries';

const ostLogic = {
  checkTransactionStatus(_, { transactionUuid }, ctx) {

  },
  checkAirdropStatus(_, { airdropUuid }, ctx) {
    return ostUserQueries.verifyAirdropStatus(airdropUuid)
      .then(status => {
        return {
          id: status.airdrop_uuid,
          currentStatus: status.current_status,
        }
      })
  }
};

export default ostLogic;