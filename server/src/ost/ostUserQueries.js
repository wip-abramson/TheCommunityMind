/**
 * Created by will on 19/04/18.
 */
import { generateQueryString, generateApiSignature } from './queryBuilder';
import axios from 'axios';

const BASE_URL = "https://playgroundapi.ost.com";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout:1000,
  headers: {Accept: "application/json"}
})

const ostUserQueries = {
  createUser: (username) => {
    const endpoint = "/users/create";
    console.log(username)
    let inputParams = {
      name: username
    };

    let createUserQuery = generateQueryString(endpoint, inputParams);
    let apiSignature = generateApiSignature(createUserQuery);

    const URL = BASE_URL + createUserQuery + "&signature=" + apiSignature;
    inputParams.signature = apiSignature;

    return axios.post(URL, inputParams)
      .then((response) => {
        console.log("SUCCESS")
        console.log(response.data.data.economy_users[0].uuid);
        return response.data.data.economy_users[0].uuid;
      })
      .catch(error => {
        console.log("ERROR")
        console.log(error.config.url);
      });
  },
  editUser: () => {
    const endpoint = "/users/edit";
    let inputParams ={};
    inputParams.uuid = '3cf76d8e-8269-4757-ba96-7a93a878d0be';
    inputParams.name = "Will A";

    let editUserQuery = generateQueryString(endpoint, inputParams);
    let apiSignature = generateApiSignature(editUserQuery);

    const completeQuery = editUserQuery + "&signature=" + apiSignature;
    inputParams.signature = apiSignature;


    // const params = {uuid: "2", name: "will"};
    console.log(inputParams.request_timestamp, createTimeString());
    console.log(inputParams);
    
    instance.post(completeQuery, inputParams)
      .then((response) => {
        console.log("SUCCESS")
        // console.log(response.data.username);
      })
      .catch(error => {
        console.log("ERROR")
        // console.log(error.config)
        // console.log(error.config.url);
        // console.log(error)

      });
  },
  getAllUsers: () => {
    const endpoint = "/users/list";
    let inputParams = {};
    inputParams.page_no = 1;

    let editUserQuery = generateQueryString(endpoint, inputParams);
    let apiSignature = generateApiSignature(editUserQuery);

    const completeQuery = editUserQuery + "&signature=" + apiSignature;
    inputParams["signature"] = apiSignature;

    instance.get(completeQuery).then(response => {
      console.log(response.data);
    })
      .catch(error => {
        console.log(error);
      })
  },

  testBuilder:() => {
    let inputParams =[];
    let request_timestamp=1524136256
  }
};

function createTimeString() {
  var d = new Date();
  var t = d.getTime();
  var o = t + "";
  return o.substring(0, 10);
}

export default ostUserQueries;