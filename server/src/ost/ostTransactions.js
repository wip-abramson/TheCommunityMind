/**
 * Created by will on 22/04/18.
 */
import ost from './ostkit'

const transactionService = ost.services.transactions;
const actionService = ost.services.actions;

const COMPANY_UUID = '4c3ba9ae-cb8e-4d1e-9e88-16d4b7a716c0';

const ACTION_NAMES = {
  Question: 'Question',
  Approve: 'Approve',
  Tip: 'Tip',
  FollowUser: 'FollowUser',
  FollowTopic: 'FollowTopic',
  LikeTopicQuestionLink: 'LikeTopicQLink'
};

let actions = [];

export const populateActions = () => {
  actionService.list({}).then(res => {
    console.log(res.data.actions);
    // res.data.actions.forEach(action => {
    //   console.log(action);
    // })
    actions = res.data.actions;
  })
    .catch((err) => { console.log(JSON.stringify(err)); });
};

function getActionId(actionName) {
  const actionNames = actions.map(action => action.name);

  let actionIndex = actionNames.indexOf(actionName);

  console.log("Got action of name : " + actionName + " with id: " + actions[actionIndex].id);
  return actions[actionIndex].id;
}

const ostTransactions = {

  executeQuestionTransaction: (from_user_id) => {

    return transactionService.execute({
      from_user_id,
      to_user_id: COMPANY_UUID,
      action_id: getActionId(ACTION_NAMES.Question)
    }).then(response => {
      console.log(response.data.transaction);
      return ostTransactions.checkTransactionStatus(response.data.transaction.id)

      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeApproveTransaction: (from_user_id, to_user_id) => {
    console.log("Approve Transcation", from_user_id, to_user_id, getActionId(ACTION_NAMES.Approve));
    return transactionService.execute({
      from_user_id: from_user_id,
      to_user_id: to_user_id,
      action_id: getActionId(ACTION_NAMES.Approve)
    }).then(response => {
      console.log(response.data.transaction);
      return ostTransactions.checkTransactionStatus(response.data.transaction.id)

      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error.err.error_data);
      })
  },
  executeUserTipTransaction: (from_user_id, to_user_id) => {
    return transactionService.execute({
      from_user_id,
      to_user_id,
      action_id: getActionId(ACTION_NAMES.Tip)
    }).then(response => {
      console.log(response.data.transaction);
      return ostTransactions.checkTransactionStatus(response.data.transaction.id)
      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeUserFollowUserTransaction: (from_user_id, to_user_id) => {
    return transactionService.execute({
      from_user_id,
      to_user_id,
      action_id: getActionId(ACTION_NAMES.FollowUser)
    }).then(response => {
      console.log(response.data.transaction);

      return ostTransactions.checkTransactionStatus(response.data.transaction.id)
      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeLikeTopicQuestionLink(from_user_id, to_user_id) {
    return transactionService.execute({
      from_user_id,
      to_user_id,
      action_id: getActionId(ACTION_NAMES.LikeTopicQuestionLink)
    }).then(response => {
      console.log(response.data.transaction);

      return ostTransactions.checkTransactionStatus(response.data.transaction.id)
      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  executeFollowTopic(from_user_id) {
    return transactionService.execute({
      from_user_id,
      to_user_id: COMPANY_UUID,
      action_id: getActionId(ACTION_NAMES.FollowTopic)
    }).then(response => {
      console.log(response.data.transaction);

      return ostTransactions.checkTransactionStatus(response.data.transaction.id)
      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  checkTransactionStatus(transactionId) {
    return transactionService.get({id: transactionId}).then(response => {
      console.log("Transaction Status : " + response.data.transaction.status);
      if (response.data.transaction.status === 'failed') {
        throw new Error('Transcation failed ', transactionId );
      }
      else if (response.data.transaction.status !== 'complete') {
        return sleep(1000).then((resolve) => ostTransactions.checkTransactionStatus(transactionId));
      }
      else {
        console.log(response.data.transaction);
        return true;
      }
    })
      .catch(error => {
        console.log("Error checking transaction status", error);
        throw new Error('Error checking transacation ', transactionId );
      })
  }
};

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default ostTransactions;