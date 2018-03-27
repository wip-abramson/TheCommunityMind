/**
 * Created by will on 24/04/17.
 */
import React, {PropTypes} from "react";
import { Link } from 'react-router'

const Owner = (props) => {
  var style = {
    fontSize: 18,
    padding: "10px 10px 0px 15px"
  }

  return (
    <Link to={{pathname: "/profile", query: {userId: props.owner.id}}} style={style}>
      {props.owner.username}
    </Link>
  )
}

Owner.propTypes = {
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired
}

export default Owner;