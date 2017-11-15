/**
 * Created by will on 14/11/17.
 */
import React from 'react'
import { Button } from 'react-bootstrap';
import FaUser from 'react-icons/fa/user';

export default (props) => {
  // console.log(props.user)
  // var user = props.user;

  if (props.loading) {
    return <p>Loading ...</p>;
  }
  if (props.error) {
    return <p>{props.error.message}</p>;
  }
  console.log(props.user, "USER")
  var btn;
  if (props.user.id == props.currentUser.id) {
    btn = <Button bsStyle="primary">Edit</Button>
  }
  else if (props.user.followedByCurrentUser) {
    btn = <Button bsStyle="primary" onClick={() => {
      props.unfollowUser(props.user);
    }}>Unfollow</Button>
  }
  else {
    btn = <Button bsStyle="primary" onClick={() => {
      props.followUser(props.user)
    }}>Follow</Button>
  }
  return (
    <div>
      <h2>{props.user.username}</h2>
      <FaUser size={70}/>
      <p>My user bio</p>
      {btn}
      <p>12 Followers</p>
      <p>20 Following</p>
    </div>
  )
}
