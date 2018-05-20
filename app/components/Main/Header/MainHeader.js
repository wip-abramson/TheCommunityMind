import React from "react";
import PropTypes from 'prop-types'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AppTitle from "./AppTitle";
import OstBalance from '../../OstBalance/OstBalance';

import styles from './styles.css';
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

            <AppTitle hideQuestionPopup={props.hideQuestionPopup}/>


          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
      </Navbar.Header>
      {props.currentUser ? (

        <div className="container-fluid">

          <Nav pullRight>
            <NavItem onClick={props.toggleOstModal}>
              <OstBalance
                totalBalance={props.currentUser.totalOstBalance}
                airdroppedBalance={props.currentUser.totalAirdroppedBalance}

              />
            </NavItem>

          </Nav>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown noCaret eventKey="4" title={props.currentUser.username} id="nav-dropdown" className={styles.username}>
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
};

MainHeader.propTypes = {
  viewWatchList: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  onQuestionClick: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })
}

export default MainHeader;
