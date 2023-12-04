import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MainVendors from './UserLanding';
import MainFood from '../components/MainFood';
import RecentlyOrdered from '../components/RecentlyOrdered';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container fluid className="py-3">
    <Row>
      <MainVendors />
    </Row>
    <Row>
      <MainFood />
    </Row>
    <Row>
      <RecentlyOrdered />
    </Row>
  </Container>
);

export default Landing;
