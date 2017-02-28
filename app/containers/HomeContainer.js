import React from 'react'
import Home from '../components/Home'

var HomeContainer = React.createClass({
  getInitialState: function () {
    return {
      currentId: 2,
      topics: [
        {
          id: 1,
          name: "A topic"
        },
        {
          id: 2,
          name: "Another topic"
        }
      ]
    }
  },


  render: function () {
    return <Home topics={this.state.topics}/>
  }
})

module.exports = HomeContainer
