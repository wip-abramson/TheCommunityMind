import React from 'react';
import Name from './AppTitle'
import LoginButtons from './LoginButtons'

var MainHeader = function () {
  var style = {
    padding: 20,
    height: "auto",
    width: "100%",
    display: "inline-block",
    background: "#d3d3d3",

  }
  return (
    <div style={style}>
      <Name/>
      <LoginButtons/>
    </div>
  )
}



export default MainHeader;
