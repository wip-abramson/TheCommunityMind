import React from 'react'
import MainHeader from './Header/MainHeader'
import FullDiv from '../generic/FullDiv'
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import { signOut } from '../../actions/Auth';
import { withApollo } from 'react-apollo';

const mapStateToProps = function (state) {
  return {
    currentUser: state.auth.currentUser,
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

  logout() {
    // should i clear it all?
    console.log("Loggin out")
    localStorage.clear();
    this.props.logout()
    this.props.client.resetStore()

  },

  viewProfile() {
    console.log("Viewing Profile")
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


