import React from 'react'
import Topic from '../components/Topic'

var TopicContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      name: "Topic Name",
      id: 1,
      whys: [{
        id: 1,
        question: "this is a why"
      }]
    }
  },


  render: function () {
    console.log(this.props);
    return (
      <Topic name={this.state.name} children={this.props.children} />
    )
  }
})

module.exports = TopicContainer;
