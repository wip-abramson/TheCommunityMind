/**
 * Created by will on 09/05/17.
 */
import React from 'react'
import {compose, graphql} from "react-apollo";
import Register from './Register';
import {addUserMutation} from '../../graphql/mutations';



export default compose(
  graphql(addUserMutation, {
    name: "addUser"
  })
)(Register)
