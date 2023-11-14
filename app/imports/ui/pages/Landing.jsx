import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { EggFried, MapFill, GlobeAmericas } from 'react-bootstrap-icons';
/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" className="py-3">
    <Row className="align-middle text-center">
      <h1>Welcome to Food Now!</h1>
      <h2>Looking for food on Campus? We can help!</h2>
      <h4>Search by..</h4>

      <Col xs={4}>
        <EggFried size={100} />
        <h1>Vendor List</h1>
        <h5>List of all food options on campus. </h5>
      </Col>

      <Col xs={4}>
        <MapFill size={100} />
        <h1>Vendor Map</h1>
        <h5>View food options on Campus Map.</h5>
      </Col>

      <Col xs={4}>
        <GlobeAmericas size={100} />
        <h1>Cuisine Type</h1>
        <h5>Search vendors by cuisine type.</h5>
      </Col>

      <h4>And more!..</h4>
      <h4>Login below to find your next meal</h4>

    </Row>
  </Container>
);

export default Landing;
