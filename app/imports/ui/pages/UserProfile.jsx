import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import FoodCard from '../components/FoodCard';

/* Renders the AddStuff page for adding a document. */
const UserProfile = () => {

  const foodData = [
    // Replace with your actual food data
    { name: 'Food 1', description: 'Description 1', image: 'https://img.freepik.com/premium-vector/piece-cheese-pizza-pixel-art-style_475147-1272.jpg' },
    { name: 'Food 2', description: 'Description 2', image: 'https://img.freepik.com/premium-vector/piece-cheese-pizza-pixel-art-style_475147-1272.jpg' },
    { name: 'Food 3', description: 'Description 3', image: 'https://img.freepik.com/premium-vector/piece-cheese-pizza-pixel-art-style_475147-1272.jpg' },
    { name: 'Food 2', description: 'Description 2', image: 'https://img.freepik.com/premium-vector/piece-cheese-pizza-pixel-art-style_475147-1272.jpg' },
    { name: 'Food 3', description: 'Description 3', image: 'https://img.freepik.com/premium-vector/piece-cheese-pizza-pixel-art-style_475147-1272.jpg' },
    // Add more food items as needed
  ];

  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() || {},
  }), []);

  const userEmail = currentUser.emails && currentUser.emails[0] && currentUser.emails[0].address;
  const userIsAdmin = Roles.userIsInRole(currentUser._id, 'admin');

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
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Account Information</h2></Col>
          <Card>
            <Card.Body>
              <h1>Name: N/A</h1>
              <h1>Email: {userEmail}</h1>
              <h1>Account Type: {getUserRole()}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {!userIsAdmin && (
        <>
          <h2>Favorited Foods</h2>
          <Row xs={1} sm={2} md={4}>
            {foodData.map((food, index) => (
              <Col key={index} className="mb-3">
                <FoodCard name={food.name} description={food.description} image={food.image} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default UserProfile;
