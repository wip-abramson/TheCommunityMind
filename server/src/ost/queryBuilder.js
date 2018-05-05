/**
 * Created by will on 19/04/18.
 */

import queryString from 'query-string';
import crypto from 'crypto';

import {API_KEY, API_SECRET} from '../../config';

const BASE_URL = "https://playgroundapi.ost.com";

export const generateQueryString = (endpoint, inputParams) => {
  inputParams.api_key = API_KEY;
  inputParams.request_timestamp= createTimeString();

  const queryParamsString = queryString.stringify(inputParams, {arrayFormat: 'bracket'}).replace(/%20/g, '+');

  console.log(queryParamsString);
  const stringToSign = endpoint + '?' + queryParamsString;
  return stringToSign;
};

export const generateApiSignature =(stringToSign) => {
  let buff = new Buffer.from(API_SECRET, 'utf8');
  let hmac = crypto.createHmac('sha256', buff);
  hmac.update(stringToSign);
  return hmac.digest('hex');

};



export const buildQuery = (inputParams, endpoint) => {

  let queryToSign = generateQueryString(endpoint, inputParams);
  let apiSignature = generateApiSignature(queryToSign);
}

// function buildQueryInputs(inputParams) => {
//
//   inputParams.api_key = API_KEY;
//   inputParams.request_timestamp= createTimeString();
// }

function createTimeString() {
  var d = new Date();
  var t = d.getTime();
  var o = t + "";
  return o.substring(0, 10);
}
