import React from 'react'

var Name = function () {
  var style = {
    width: 500,
    display: "inline-block"
  }
  return (
    <div style={style}>
      <a  href="/">
        <h1>Inquisitive Minds</h1>
        <h4>Open sourcing creativity</h4>
      </a>
    </div>
  )
}

module.exports = Name;
