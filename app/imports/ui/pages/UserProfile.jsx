import React from 'react';
import { Container } from 'react-bootstrap';
import AccountInfoCard from '../components/AccountInfoCard';

/* A simple static component to render some text for the landing page. */
const UserProfile = () => (
  <Container id="landing-page" fluid className="py-3">
    <Container>
      <h1>Account Information</h1>
      <AccountInfoCard />
    </Container>
  </Container>
);

export default UserProfile;
