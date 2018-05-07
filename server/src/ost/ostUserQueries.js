/**
 * Created by will on 19/04/18.
 */
import { buildQuery } from './queryBuilder';
import axios from 'axios';

const ostUserQueries = {
    createUser: (username) => {
      const endpoint = "/users/create";
      let inputParams = {
        name: username
      };

      const query = buildQuery(endpoint, inputParams);

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
      let inputParams = {};
      inputParams.uuid = '3cf76d8e-8269-4757-ba96-7a93a878d0be';
      inputParams.name = "Will A";

      const query = buildQuery(endpoint, inputParams);

      axios.post(query.url, query.queryParams)
        .then((response) => {
          console.log("Successfully edited user", response.data.data.economy_users[0].name)
        })
        .catch(error => {
          console.log("Error editing user")

        });
    },
    getAllUsers: () => {
      const endpoint = "/users/list";
      let inputParams = {
        page_no: 1
      };

      const query = buildQuery(endpoint, inputParams);

      axios.get(query.url)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    },
    airdropNewUser: () => {
      const endpoint = '/users/airdrop/drop';
      let inputParams = {
        amount: 500,
        list_type: 'never_airdropped'
      };

      const query = buildQuery(endpoint, inputParams);

      return axios.post(query.url, query.queryParams)
        .then(response => {
            console.log("Successfully executed airdrop to new users", response.data.data.airdrop_uuid)
            return ostUserQueries.verifyAirdropStatus(response.data.data.airdrop_uuid)
              .then(status => {
                console.log(status);
                return status.airdrop_uuid;
              })
            // return response.data.data.airdrop_uuid;
          }
        )
        .catch(error => {
          console.log("Error airdropping tokens to new users", error)
          return error;
        })

    },
    verifyAirdropStatus: (airdropUuid) => {
      const endpoint = '/users/airdrop/status';
      let inputParams = {
        airdrop_uuid: airdropUuid
      };

      const query = buildQuery(endpoint, inputParams);

      return axios.get(query.url)
        .then(response => {
          console.log(response.data.data)
          return response.data.data;
        })
        .catch(error => {
          console.log("Unable to check status ", error);
        })
    }
  }
;

export default ostUserQueries;