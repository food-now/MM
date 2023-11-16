import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MainVendors from '../components/MainVendors';
import MainFood from '../components/MainFood';
import RecentlyOrdered from '../components/RecentlyOrdered';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Container>
      <Row className="landing-row" />
      <Row>
        <MainVendors />
      </Row>
    </Container>
    <Container style={{ marginTop: '25px' }}>
      <Row>
        <MainFood />
      </Row>
    </Container>
    <Container style={{ marginTop: '25px' }}>
      <Row>
        <RecentlyOrdered />
      </Row>
    </Container>
  </Container>
);

export default Landing;
