import React from 'react'
import MainHeader from '../components/MainHeader'

var Main = React.createClass({
  render: function() {
    return (

      <div className='main-container '>
        <MainHeader className='container-fluid'></MainHeader>

        {this.props.children}
      </div>
    )
  }
})

module.exports = Main;
