import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

/* Renders the AddStuff page for adding a document. */
const UserProfile = () => {

  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() || {},
  }), []);

  const userEmail = currentUser.emails && currentUser.emails[0] && currentUser.emails[0].address;

  const getUserRole = () => {
    const userId = currentUser._id;

    console.log('User ID:', userId);

    if (Roles.userIsInRole(userId, 'vendor')) {
      console.log('User is a vendor');
      return 'Vendor';
    }

    if (Roles.userIsInRole(userId, 'admin')) {
      console.log('User is an admin');
      return 'Admin';
    }

    console.log('User is a customer');

    // Assuming 'customer' is the default role
    return 'Customer';
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (
  // eslint-disable-next-line max-len
    <Container className="py-3" id="UserProfile-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Account Information</h2></Col>
          <Card>
            <Card.Body>
              <h1>Email: {userEmail}</h1>
              <h1>Account Type: {getUserRole()}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
