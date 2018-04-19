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
    let inputParams = [];
    inputParams["name"] = username;
    let createUserQuery = generateQueryString(endpoint, inputParams);
    let apiSignature = generateApiSignature(createUserQuery);
    console.log(createUserQuery);
    console.log(apiSignature);
    const completeQuery = BASE_URL + createUserQuery + "&signature=" + apiSignature;
    console.log(completeQuery);
    axios.post(completeQuery)
      .then((response) => {
        console.log("SUCCESS", response)
        // console.log(response.data.username);
      })
      .catch(error => {
        console.log("ERROR")
        console.log(error.config.url);
      });
  },
  editUser: () => {
    const endpoint = '/users/edit';
    let inputParams =[];
    inputParams["uuid"] = 24;
    inputParams["name"] = "Will";

    let editUserQuery = generateQueryString(endpoint, inputParams);
    let apiSignature = generateApiSignature(editUserQuery);

    const completeQuery = editUserQuery + "&signature=" + apiSignature;

    instance.post(completeQuery)
      .then((response) => {
        console.log("SUCCESS", response)
        // console.log(response.data.username);
      })
      .catch(error => {
        console.log("ERROR")
        console.log(error.config)
        console.log(error.config.url);
      });
  },

  testBuilder:() => {
    let inputParams =[];
    request_timestamp=1524136256
  }
};

export default ostUserQueries;