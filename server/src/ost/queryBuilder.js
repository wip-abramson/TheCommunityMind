/**
 * Created by will on 19/04/18.
 */

import queryString from 'query-string';
import crypto from 'crypto';

import {API_KEY, API_SECRET} from '../../config';

const BASE_URL = "https://playgroundapi.ost.com";

export const buildQuery = (endpoint, inputParams) => {
  inputParams.api_key = API_KEY;
  inputParams.request_timestamp= createTimeString();

  const queryParamsString = queryString.stringify(inputParams, {arrayFormat: 'bracket'}).replace(/%20/g, '+');
  const stringToSign = endpoint + '?' + queryParamsString;

  const signature = generateApiSignature(stringToSign);
  inputParams.signature = signature;

  const URL = BASE_URL + stringToSign + "&signature=" + signature;

  return {
    url: URL,
    queryParams: inputParams
  }
}


function generateApiSignature(stringToSign) {
  let buff = new Buffer.from(API_SECRET, 'utf8');
  let hmac = crypto.createHmac('sha256', buff);
  hmac.update(stringToSign);
  return hmac.digest('hex');

};


function createTimeString() {
  var d = new Date();
  var t = d.getTime();
  var o = t + "";
  return o.substring(0, 10);
}
