import React from 'react'

const FullDiv = function(props) {
  var style={
    height: "100%",
  }
  return (
    <div  style={style}>
      {props.children}
    </div>)
}

module.exports = FullDiv;
