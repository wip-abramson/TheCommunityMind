import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'

var Hello = React.createClass({
  render: function () {
    return <div>Hello</div>
  }
});

ReactDOM.render(routes, document.getElementById("app"))
