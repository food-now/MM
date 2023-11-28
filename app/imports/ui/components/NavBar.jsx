import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonLinesFill, PersonPlusFill } from 'react-bootstrap-icons';
import { Roles } from 'meteor/alanning:roles';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image
            src="https://media.discordapp.net/attachments/1171567131977068675/1172018671007301732/Food_Now_Logo_1.png?ex=655eca72&is=654c5572&hm=30da1d3d7f91e9c61457bd049a0cbe1734d7eaa3d5c10be1beebec254778664d&=&width=792&height=792"
            alt="logo"
            style={{ width: '90px', height: '90px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="link2 me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="AddItem" as={NavLink} to="/add" key="add">Add Item</Nav.Link>,
              <Nav.Link id="AllVendors" as={NavLink} to="/list" key="list">All Vendors</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="AllUsers" as={NavLink} to="/user-list" key="admin">All Users</Nav.Link>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="AddUser" as={NavLink} to="/adminadd" key="admin">Add User</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="userProfile" as={NavLink} to="/profile">
                  <PersonLinesFill />
                  {' '}
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
