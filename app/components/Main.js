import React from 'react'
import MainHeader from '../components/MainHeader'
import FullDiv from './generic/FullDiv'
import { Grid } from 'react-bootstrap'

function Main (props) {
  var style = {
    padding: 20

  }
  return (
    <FullDiv>
      <MainHeader></MainHeader>
      <Grid style={style}>

        {props.children}
      </Grid>

    </FullDiv>
  )
}


module.exports = Main;
