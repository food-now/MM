import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center" style={{ color: 'black' }}>
        Department of Information and Computer Sciences
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
      </Col>
    </Container>
  </footer>
);

export default Footer;
