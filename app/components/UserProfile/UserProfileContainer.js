/**
 * Created by will on 14/11/17.
 */
import React from 'react'

import UserInformation from './UserInformation'

const UserProfileContainer = React.createClass({
  render() {
    console.log(this.props.location.query.userId)

    return (
      <UserInformation/>
    )
  }
})

export default UserProfileContainer;

