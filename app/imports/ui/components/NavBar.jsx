import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Button, Container, FormControl, Image, InputGroup, Nav, Navbar, NavDropdown, Form, FormCheck } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, PersonLinesFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const [selectedOption, setSelectedOption] = useState('delivery');

  const handleToggleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Navbar bg="light" expand="lg" style={{ flexFlow: 'column' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image
            src="https://media.discordapp.net/attachments/1171567131977068675/1172018671007301732/Food_Now_Logo_1.png?ex=655eca72&is=654c5572&hm=30da1d3d7f91e9c61457bd049a0cbe1734d7eaa3d5c10be1beebec254778664d&=&width=792&height=792"
            alt="logo"
            style={{ width: '70px', height: '70px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav flex-column">
          <Nav className="me-auto justify-content-start">
            <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add"><h3>Vendors</h3></Nav.Link>
            <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list"><h3>Food</h3></Nav.Link>
            <Form style={{ marginTop: '12px', marginLeft: '30px' }}>
              <FormCheck
                type="switch"
                id="custom-switch"
                label={selectedOption === 'delivery' ? 'Delivery' : 'Pickup'}
                checked={selectedOption === 'delivery'}
                onChange={handleToggleChange}
                value={selectedOption}
              />
            </Form>
            <InputGroup className="ml-1" style={{ marginLeft: '50px' }}>
              <FormControl placeholder="Search vendors and food" />
              <Button variant="outline-secondary">Search</Button>
            </InputGroup>
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
                <NavDropdown.Item id="navbar-profile" as={NavLink} to="/user-profile">
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
