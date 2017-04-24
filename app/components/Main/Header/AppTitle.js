import React from "react";


var AppTitle = function () {
  var style = {
    display: "inline-block"
  }

  var noMargin = {
    margin: 0,
    display: "inline-block",
  }

  var imgstyle = {
    width: 300,
    height: 150,
  }

  return (
    <div style={noMargin}>
      <img src="public/imgs/CMlogo.jpg" style={imgstyle}/>
      {/*<h4 style={noMargin}>The</h4>*/}
      {/*<h2 style={noMargin}>Community Mind</h2>*/}
      {/*<h4 style={noMargin}>Open sourcing creativity</h4>*/}
    </div>
  )
}

export default AppTitle;
