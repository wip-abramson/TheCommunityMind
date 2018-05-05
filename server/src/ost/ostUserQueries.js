/**
 * Created by will on 19/04/18.
 */
import { buildQuery } from './queryBuilder';
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

    let inputParams = {
      name: username
    };

    const query = buildQuery(endpoint,inputParams);


    return axios.post(query.url, query.queryParams)
      .then((response) => {
        console.log("Succesfully created user", response.data.data.economy_users[0].uuid)
        return response.data.data.economy_users[0].uuid;
      })
      .catch(error => {
        console.log("Error unable to create user")
      });
  },
  editUser: (uuid, username) => {
    // TODO make input params use username and uuid from function inputs
    const endpoint = "/users/edit";
    let inputParams ={};
    inputParams.uuid = '3cf76d8e-8269-4757-ba96-7a93a878d0be';
    inputParams.name = "Will A";

    const query = buildQuery(endpoint,inputParams);


    axios.post(query.url, query.queryParams)
      .then((response) => {
        console.log("Successfully edited user")
      })
      .catch(error => {
        console.log("Error editing user", response.data.data.economy_users[0].username)

      });
  },
  getAllUsers: () => {
    const endpoint = "/users/list";
    let inputParams = {
      page_no: 1
    };

    const query = buildQuery(endpoint,inputParams);


    axios.get(query.url).then(response => {
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