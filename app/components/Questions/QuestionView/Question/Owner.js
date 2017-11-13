/**
 * Created by will on 24/04/17.
 */
import React, {PropTypes} from "react";

const Owner = (props) => {
  var style = {
    fontSize: 10,
  }

  return (
    <div style={style}>
      {props.owner.username}
    </div>
  )
}

Owner.PropTypes = {
  owner: PropTypes.string.isRequired
}

export default Owner;