/**
 * Created by will on 22/04/18.
 */
import ost from './ostkit'

const COMPANY_UUID = '4c3ba9ae-cb8e-4d1e-9e88-16d4b7a716c0';

const TRANSACTION_TYPES = {
  Question: 'Question',
  Approve: 'Approve',
  Tip: 'Tip',
  FollowUser: 'FollowUser',
  FollowTopic: 'FollowTopic',
  LikeTopicQuestionLink: 'LikeTopicQLink'
};

const ostTransactions = {
  executeQuestionTransaction: (from_uuid) => {
    return ost.transactiontypesExecute({
      from_uuid,
      to_uuid: COMPANY_UUID,
      transaction_kind: TRANSACTION_TYPES.Question
    }).then(transaction_result => {
      return ostTransactions.monitorTransaction(transaction_result.transaction_uuid)

      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeApproveTransaction: (from_uuid, to_uuid) => {
    return ost.transactiontypesExecute({
      from_uuid,
      to_uuid: to_uuid,
      transaction_kind: TRANSACTION_TYPES.Approve
    }).then(transaction_result => {
      return ostTransactions.monitorTransaction(transaction_result.transaction_uuid)

      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeUserTipTransaction: (from_uuid, to_uuid) => {
    return ost.transactiontypesExecute({
      from_uuid,
      to_uuid: to_uuid,
      transaction_kind: TRANSACTION_TYPES.Tip
    }).then(transaction_result => {
      return ostTransactions.monitorTransaction(transaction_result.transaction_uuid)

      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeUserFollowUserTransaction: (from_uuid, to_uuid) => {
    return ost.transactiontypesExecute({
      from_uuid,
      to_uuid: to_uuid,
      transaction_kind: TRANSACTION_TYPES.FollowUser
    }).then(transaction_result => {
      return ostTransactions.monitorTransaction(transaction_result.transaction_uuid)
      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeLikeTopicQuestionLink(from_uuid, to_uuid) {
    return ost.transactiontypesExecute({
      from_uuid,
      to_uuid: to_uuid,
      transaction_kind: TRANSACTION_TYPES.LikeTopicQuestionLink
    }).then(transaction_result => {
      return ostTransactions.monitorTransaction(transaction_result.transaction_uuid)
      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeFollowTopic(from_uuid) {
    return ost.transactiontypesExecute({
      from_uuid,
      to_uuid: COMPANY_UUID,
      transaction_kind: TRANSACTION_TYPES.FollowTopic
    }).then(transaction_result => {
      return ostTransactions.monitorTransaction(transaction_result.transaction_uuid)
      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  monitorTransaction(transaction_uuid) {
    return ost.monitorTransaction(transaction_uuid , function(transaction) {
      if (transaction.status === "complete") {
        console.log("Transaction complete", transaction.transaction_uuid);
        ost.stopMonitoringTransaction(transaction_uuid);
        return transaction
      } else if (transaction.status === "failed") {
        console.log("Transaction failed")
        throw new Error('Transaction Failed');

      } else {
        console.log("STATUS")
        console.log("Status: ",transaction.status)
      }
    })
  }
};

export default ostTransactions;