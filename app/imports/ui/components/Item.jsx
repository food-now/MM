import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import AddNote from './AddNote';

// import { Link } from 'react-router-dom';

/** Renders a single row in the Item Stuff table. See pages/_____.jsx. */
const Item = ({ item }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={item.image} width={75} />
      <Card.Title>{item.item}</Card.Title>
      <Card.Subtitle>{item.price}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{item.description}</Card.Text>
      {/* <AddNote owner={vendor.owner} contactID={vendor._id} /> */}
      <Link to={`/edit/${item._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

Item.propTypes = {
  item: PropTypes.shape({
    item: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Item;
