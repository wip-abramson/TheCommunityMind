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
    }).then(response => {
      console.log("Successfully executed question transaction", response);
      //TODO monitor the transaciton and push notifications to frontend

      return response.transaction_uuid;
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