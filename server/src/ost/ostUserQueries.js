/**
 * Created by will on 19/04/18.
 */
import ost from './ostkit';

const ostUserQueries = {
    createUser: (username) => {
      return ost.usersCreate({ name: username })
        .then(res => {
          console.log("Ost User Created", res);
          return res.economy_users[0].uuid;
        })
        .catch(error => {
          console.log("Unable to create user", error);
        })
    },
    getUser: (uuid, name) => {
      // TODO this is a hack ost not implemented getUser yet
      return ost.usersEdit({ uuid, name })
        .then(res => {
          console.log("Success", res.economy_users[0]);
          return res.economy_users[0]
        })
        .catch(error => {
          console.log("Error", error);
          return null;
        })
    },
    editUser: (uuid, name) => {

      ost.usersEdit({ uuid, name })
        .then(res => {
          console.log("Success", res.economy_users[0]);
        })
        .catch(error => {
          console.log("Error", error);
        })
    },
    getAllUsers: (page_no) => {
    // TODO if needed
    },
    airdropNewUser: () => {
      const amount = 50;
      const list_type = "never_airdropped";
      ost.usersAirdropDrop({amount, list_type})
        .then(response => {
            console.log("Successfully executed airdrop to new users", response)
          }
        )
        .catch(error => {
          console.log("Error airdropping tokens to new users", error)
          return error;
        })
    }
  // TODO Verify status of airdrop.
    // verifyAirdropStatus: (airdropUuid) => {
    //   const endpoint = '/users/airdrop/status';
    //   let inputParams = {
    //     airdrop_uuid: airdropUuid
    //   };
    //
    //   const query = buildQuery(endpoint, inputParams);
    //
    //   return axios.get(query.url)
    //     .then(response => {
    //       console.log(response.data.data)
    //       return response.data.data;
    //     })
    //     .catch(error => {
    //       console.log("Unable to check status ", error);
    //     })
    // }
  }
;

export default ostUserQueries;