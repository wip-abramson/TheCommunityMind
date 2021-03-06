import React from "react";
import {Link} from 'react-router';


var AppTitle = function (props) {


  var noMargin = {
    margin: 0,
    padding: 10,
    display: "inline-block",
    color: "black"
  }

  return (
      <Link to='/' onClick={props.hideQuestionPopup}>

        <div style={noMargin}>
          <img src="public/imgs/thecommunitymind_logo1@0.5x.png"/>
        </div>
      </Link>
  )
}

export default AppTitle;
