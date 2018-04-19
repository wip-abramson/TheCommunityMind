/**
 * Created by will on 19/04/18.
 */

import queryString from 'query-string';
import crypto from 'crypto';

import {API_KEY, API_SECRET} from '../../config';



export const generateQueryString = (endpoint, inputParams) => {
  inputParams["api_key"] = API_KEY;
  inputParams["request_timestamp"] = Math.floor(Date.now() /1000);

  const queryParamsString = queryString.stringify(inputParams, {arrayFormat: 'bracket'}).replace(/%20/g, '+');

  console.log(queryParamsString);
  const stringToSign = endpoint + '?' + queryParamsString;
  return stringToSign;
};

export const generateApiSignature =(stringToSign) => {
  console.log(stringToSign);
  let buff = new Buffer.from(API_SECRET, 'utf8');
  let hmac = crypto.createHmac('sha256', buff);
  hmac.update(stringToSign);
  return hmac.digest('hex');

}