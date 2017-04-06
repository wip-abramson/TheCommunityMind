import React from 'react'

var AppTitle = function () {
  var style = {
    width: 500,
    display: "inline-block"
  }

  var noMargin = {
    margin: 0
  }

  return (
    <div style={style}>
      <a  href="/">
        <h4 style={noMargin}>The</h4>
        <h1 style={noMargin}>Community Mind</h1>
        <h4 style={noMargin}>Open sourcing creativity</h4>
      </a>
    </div>
  )
}

export default AppTitle;
