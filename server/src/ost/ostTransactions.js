/**
 * Created by will on 22/04/18.
 */
import { buildQuery } from './queryBuilder';
import axios from 'axios';

const COMPANY_UUID = '4c3ba9ae-cb8e-4d1e-9e88-16d4b7a716c0';

const TRANSACTION_TYPES = {
  Question: 'Question'
}

const ostTransactions = {
  executeQuestionTransaction: (from_uuid) => {
    const endpoint = '/transaction-types/execute';
    let inputParams = {
      from_uuid: from_uuid,
      to_uuid: COMPANY_UUID,
      transaction_kind: TRANSACTION_TYPES.Question
    };

    const query = buildQuery(endpoint, inputParams);

    return axios.post(query.url, query.queryParams)
      .then(response => {
        console.log("Successfully executed question transaction", response.data.data.transaction_uuid);
        return ostTransactions.checkTransactionStatus(response.data.data.transaction_uuid)
          .then(transaction_hash => transaction_hash)
      })
      .catch(error => {

      })
  },
  checkTransactionStatus: (transaction_uuid) => {
    const endpoint ='/transaction-types/execute';
    let inputParams = {};
    inputParams['transaction_uuids[]'] = [transaction_uuid];

    const query = buildQuery(endpoint, inputParams);
    console.log(query.url);
    return axios.post(query.url, query.queryParams)
      .then(response => {
        console.log("Successfully checked status of " + transaction_uuid, response.data.data.transactions[0].transaction_hash);
        return response.data.data.transactions[0].transaction_hash;
      })
      .catch(error => {
        console.log('Error, unable to check status of transaction')
      })
  }
}

export default ostTransactions;