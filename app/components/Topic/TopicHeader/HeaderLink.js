import React, {PropTypes} from "react";
import {Link} from "react-router";


function HeaderLink(props) {
  var style = {
    width: "200px",
    border: "1px solid black",
    fontSize: "20px",
    padding: "10px",
    margin: "10px"
  }
  return (
    <Link style={style}
          to={props.to}
          onClick={props.onUpdateHeader}>
      {props.children}
    </Link>
  )
}

HeaderLink.PropTypes = {
  onUpdateHeader: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  
}

export default HeaderLink;
