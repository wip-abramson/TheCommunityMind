import React from "react";
import {Link} from 'react-router';


var AppTitle = function () {


  var noMargin = {
    margin: 0,
    padding: 10,
    display: "inline-block",
  }

  var imgstyle = {
      // height: 150,
      // width: 300
  }

  return (
      <Link to='/'>

        <div style={noMargin}>
          <img src="public/imgs/thecommunitymind_logo1@0.75x.png" style={imgstyle}/>
        </div>
      </Link>
  )
}

export default AppTitle;
