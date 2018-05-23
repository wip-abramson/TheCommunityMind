/**
 * Created by will on 19/04/18.
 */
import ost from './ostkit';

const userService = ost.services.users;
const airdropService = ost.services.airdrops;


const ostUserQueries = {
    createUser: (username) => {
      return userService.create({ name: username })
        .then(res => {
          console.log("Ost User Created", res.data.user);
          return res.data.user.id;
        })
        .catch(error => {
          console.log("Unable to create user", error);
        })
    },
    getUser: (uuid) => {
      // TODO this is a hack ost not implemented getUser yet
      return userService.get({ id: uuid })
        .then(res => {
          console.log("Success", res.data.user);
          return res.data.user;
        })
        .catch(error => {
          console.log("Error", error);
          return null;
        })
    },
    editUser: (uuid, name) => {

      userService.edit({ id: uuid, name: name })
        .then(res => {
          console.log("Success", res.data.user);
        })
        .catch(error => {
          console.log("Error", error);
        })
    },
    getAllUsers: (page_no) => {
    // TODO if needed
    },
    airdropNewUser: (user_id) => {
      const amount = 50;
      const list_type = "never_airdropped";
      airdropService.execute({amount, user_ids: user_id})
        .then(response => {
            console.log("Successfully executed airdrop to new users", response)
          // airdropService.get()
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