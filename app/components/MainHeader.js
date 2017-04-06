import React from 'react';
import AppTitle from './AppTitle'
import LoginButtons from './LoginButtons'

var MainHeader = function () {
  var style = {
    padding: 10,
    height: "auto",
    width: "100%",
    display: "inline-block",
    background: "#d3d3d3",

  }
  return (
    <div style={style}>
      <AppTitle/>
      <LoginButtons/>
    </div>
  )
}



export default MainHeader;
