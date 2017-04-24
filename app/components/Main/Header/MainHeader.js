import React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import AppTitle from "./AppTitle";


var MainHeader = function () {
  var style = {
    marginTop: 10

  }
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <LinkContainer to="/" onlyActiveOnIndex>
          <Navbar.Brand>

            <AppTitle/>


          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav style={style}>


        </Nav>
        <Nav pullRight style={style}>
          <LinkContainer to="login">
            <NavItem eventKey={1}>Login</NavItem>
          </LinkContainer>
          <LinkContainer to="register">
            <NavItem eventKey={2}>Register</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default MainHeader;
