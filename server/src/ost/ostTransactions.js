/**
 * Created by will on 22/04/18.
 */
import ost from './ostkit'

const COMPANY_UUID = '4c3ba9ae-cb8e-4d1e-9e88-16d4b7a716c0';

const TRANSACTION_TYPES = {
  Question: 'Question'
}

const ostTransactions = {
  executeQuestionTransaction: (from_uuid) => {
    return ost.transactiontypesExecute({
      from_uuid,
      to_uuid: COMPANY_UUID,
      transaction_kind: TRANSACTION_TYPES.Question
    }).then(transaction_result => {
      ost.monitorTransaction(transaction_result.transaction_uuid , function(transaction) {
        if (transaction.status === "complete") {
          return transaction_result.transaction_uuid;
        } else if (transaction.status === "failed") {
          console.log("Transaction failed")
          throw new Error('Transaction Failed');

        } else {
          console.log("Status: ",transaction.status)
        }
      });
      //TODO monitor the transaciton and push notifications to frontend


    })
      .catch(error => {
        console.log("Error executing question transaction", error);
      })
  },
  // checkTransactionStatus: (transaction_uuid) => {
  //   const endpoint ='/transaction-types/execute';
  //   let inputParams = {};
  //   inputParams['transaction_uuids[]'] = [transaction_uuid];
  //
  //   const query = buildQuery(endpoint, inputParams);
  //   console.log(query.url);
  //   return axios.post(query.url, query.queryParams)
  //     .then(response => {
  //       console.log("Successfully checked status of " + transaction_uuid, response.data.data.transactions[0].transaction_hash);
  //       return response.data.data.transactions[0].transaction_hash;
  //     })
  //     .catch(error => {
  //       console.log('Error, unable to check status of transaction')
  //     })
  // }
}

export default ostTransactions;