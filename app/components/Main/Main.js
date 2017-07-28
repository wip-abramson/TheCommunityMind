import React from 'react'
import MainHeader from './Header/MainHeader'
import FullDiv from '../generic/FullDiv'
import {Grid} from 'react-bootstrap'
import { connect } from 'react-redux'

const mapStateToProps = function (state) {
  return {
    currentUser: state.currentUser,
  }
};
const mapDispatchToProps = function (dispatch) {

};

function Main(props) {
  var style = {
    padding: 20

  }
  return (
    <FullDiv>
      <MainHeader currentUser={props.currentUser}></MainHeader>
      <Grid style={style}>

        {props.children}
      </Grid>

    </FullDiv>
  )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Main);


