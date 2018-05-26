import React from 'react'
import MainHeader from './Header/MainHeader'
import FullDiv from '../generic/FullDiv';
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { signOut } from '../../actions/Auth';
import { showQuestionPopup, hideQuestionPopup } from '../../actions/QuestionPopup';
import { withApollo } from 'react-apollo';
import { browserHistory } from 'react-router'
import QuestionPopupContainer from '../old/QuestionPopup/QuestionPopupContainer';

import Notifications from 'react-notification-system-redux';
import Modal from '../generic/Modal/Modal';
import OstInformation from '../OstInformation/OstInformation';



const mapStateToProps = function (state) {
  return {
    currentUser: state.auth.currentUser,
    notifications: state.notifications,
    currentWhy: state.currentWhy,
    currentWhatIf: state.currentWhatIf
  }
};

const mapDispatchToProps = function (dispatch) {
  return {
    logout: () => {
      dispatch(signOut());
    },
    showQuestionPopup: () => {
      dispatch(showQuestionPopup(null));
    },
    hideQuestionPopup: () => {
      dispatch(hideQuestionPopup())
    }
  }
};

class Main extends React.Component{
  style = {
    padding: "70px 20px"
  };


  //Optional styling
  notificationStyle = {
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
  };

  constructor(props) {
    super(props);

    this.state = {
      ostModalOpen: false
    }
    this.viewWatchList = this.viewWatchList.bind(this);
    this.logout = this.logout.bind(this);
    this.showQuestionPopup = this.showQuestionPopup.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.toggleOstModal = this.toggleOstModal.bind(this);
  }

  logout() {
    // should i clear it all?
    console.log("Loggin out", this.props)
    localStorage.clear();
    this.props.logout()
    // this.props.client.resetStore()

  }

  showQuestionPopup() {
    this.props.showQuestionPopup(this.props.currentWhy, this.props.currentWhatIf)
  }

  viewProfile() {
    browserHistory.push({pathname: "/profile", query: {userId: this.props.currentUser.id}})
  }


  viewWatchList() {

    console.log("Viewing watch list")
  }

  toggleOstModal() {
    console.log("Toggle Modal");
    this.setState({
      ostModalOpen: !this.state.ostModalOpen
    });
  }

  componentDidMount() {
    console.log("Current User", this.props.currentUser)
    if(!this.props.currentUser) {
      browserHistory.push({pathname: "/landing"})

    }
  }

  render() {
    return (
      <FullDiv>
        <MainHeader
          currentUser={this.props.currentUser}
          logout={this.logout}
          viewProfile={this.viewProfile}
          viewWatchList={this.viewWatchList}
          onQuestionClick={this.showQuestionPopup}
          hideQuestionPopup={this.props.hideQuestionPopup}
          toggleOstModal={this.toggleOstModal}
        ></MainHeader>


        <Grid style={this.style}>
          <QuestionPopupContainer/>
          {this.props.children}
        </Grid>
        <Notifications
          notifications={this.props.notifications}
          style={this.notificationStyle}
        />
        <Modal onClose={this.toggleOstModal} show={this.state.ostModalOpen}>
          <OstInformation/>
        </Modal>

      </FullDiv>
    )
  }
}

export default withApollo(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Main)
)


