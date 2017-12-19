import React from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AppTitle from "./AppTitle";
import FaQuestionCircle from 'react-icons/fa/question-circle'

var MainHeader = function (props) {
  var style = {
    marginTop: 10

  }
  return (
  <div>
    <Navbar className="navbar-fixed-top" collapseOnSelect>
      <Navbar.Header>
        <LinkContainer to="/" onlyActiveOnIndex>
          <Navbar.Brand>

            <AppTitle/>


          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
      </Navbar.Header>
      {props.currentUser ? (
        <div>
          <Nav pullRight>

            <NavItem >
              <FaQuestionCircle onClick={props.onQuestionClick} size={70}/>
            </NavItem>
          </Nav>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey="4" title={props.currentUser.username} id="nav-dropdown">
                <LinkContainer to={{pathname: "/profile", query: {userId: props.currentUser.id}}}>
                  <MenuItem>Profile</MenuItem>
                </LinkContainer>
                <MenuItem eventKey="4.2" onSelect={() => {props.viewWatchList()}}>Watch list</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4.4" onSelect={() => {props.logout()}}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>





      ) : (
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
      )

      }

    </Navbar>
  </div>

  )
}

export default MainHeader;
