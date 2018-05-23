/**
 * Created by will on 09/05/18.
 */
import OSTSDK from '@ostdotcom/ost-sdk-js';
import {API_KEY, API_SECRET} from '../../config';

const ENDPOINT="https://sandboxapi.ost.com/v1/";

const ostObj = new OSTSDK({apiKey: API_KEY, apiSecret: API_SECRET, apiEndpoint: ENDPOINT});
export default ostObj;