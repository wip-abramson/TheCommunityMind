import React from "react";
import {Nav, Navbar, NavItem, FormGroup, FormControl, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import AppTitle from "./AppTitle";


var MainHeader = function () {
  var style = {
    marginTop: 10

  }
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <AppTitle/>

        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav style={style}>
          <LinkContainer to="/" onlyActiveOnIndex>
            <NavItem eventKey={1}>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/wiki">
            <NavItem eventKey={1}>Wiki</NavItem>
          </LinkContainer>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search"/>
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
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
