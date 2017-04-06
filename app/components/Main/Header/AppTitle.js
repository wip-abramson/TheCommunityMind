import React from "react";

var AppTitle = function () {
  var style = {
    display: "inline-block"
  }

  var noMargin = {
    margin: 0
  }

  return (
    <div style={style}>
      <h4 style={noMargin}>The</h4>
      <h2 style={noMargin}>Community Mind</h2>
      <h4 style={noMargin}>Open sourcing creativity</h4>
    </div>
  )
}

export default AppTitle;
