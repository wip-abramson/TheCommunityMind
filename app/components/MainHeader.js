import React from 'react';
import Name from './Name'
import LoginButtons from './LoginButtons'

var MainHeader = function () {
  var style = {
    padding: 20,
    height: "0%",
    width: "100%",
    display: "inline-block",
    background: "#d3d3d3",
    marginBottom: 10

  }
  return (
    <div style={style}>
      <Name/>
      <LoginButtons/>
    </div>
  )
}



module.exports = MainHeader;
