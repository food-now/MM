import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import AddNote from './AddNote';

// import { Link } from 'react-router-dom';

/** Renders a single row in the Item Stuff table. See pages/_____.jsx. */
const ItemHeader = ({ vendor }) => (
  <Container>
    <Row>
      <Col>
        <Image src={vendor.Logo} width={75} />
      </Col>
      <Col>
        <p>{vendor.vendorName}</p>
        <Link to={`${vendor.weblink}`}>Company Site</Link>
      </Col>
    </Row>
  </Container>
);

ItemHeader.propTypes = {
  vendor: PropTypes.shape({
    vendorName: PropTypes.string,
    Logo: PropTypes.string,
    owner: PropTypes.string,
    weblink: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ItemHeader;
