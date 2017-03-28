import React from 'react'
import MainHeader from '../components/MainHeader'
import FullDiv from './generic/FullDiv'
import { Grid } from 'react-bootstrap'

function Main (props) {
  return (
    <FullDiv className='main-container container-full'>
      <MainHeader className='container-fluid'></MainHeader>
      <FullDiv className="container-fluid">

        {props.children}
      </FullDiv>

    </FullDiv>
  )
}


module.exports = Main;
