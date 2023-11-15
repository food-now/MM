import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col>
          <h4>About Us</h4>
        </Col>
        <Col>
          <h4>Careers</h4>
        </Col>
        <Col>
          <h4>Gift Cards</h4>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
