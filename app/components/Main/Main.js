import React from 'react'
import MainHeader from './Header/MainHeader'
import FullDiv from '../generic/FullDiv';
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import { signOut } from '../../actions/Auth';
import { withApollo } from 'react-apollo';

import Notifications from 'react-notification-system-redux';



const mapStateToProps = function (state) {
  return {
    currentUser: state.auth.currentUser,
    notifications: state.notifications,
  }
};

const mapDispatchToProps = function (dispatch) {
  return {
    logout: () => {
      dispatch(signOut());
    }
  }
}

let Main = React.createClass({
  style: {
    padding: 20
  },


  //Optional styling
  notificationStyle: {
    NotificationItem: { // Override the notification item
      DefaultStyle: { // Applied to every notification, regardless of the notification level
        margin: '10px 5px 2px 1px'
      },

      success: { // Applied only to the success notification item
        color: 'green'
      },
      error: {
        color: 'red'
      }
    }
  },

  logout() {
    // should i clear it all?
    console.log("Loggin out")
    localStorage.clear();
    this.props.logout()
    this.props.client.resetStore()

  },


  viewWatchList() {

    console.log("Viewing watch list")
  },

  render() {
    return (
      <FullDiv>
        <MainHeader
          currentUser={this.props.currentUser}
          logout={this.logout}
          viewProfile={this.viewProfile}
          viewWatchList={this.viewWatchList}
        ></MainHeader>
        <Grid style={this.style}>

          {this.props.children}
        </Grid>
        <Notifications
          notifications={this.props.notifications}
          style={this.notificationStyle}
        />

      </FullDiv>
    )
  }
})

export default withApollo(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Main)
)


