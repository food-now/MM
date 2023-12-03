import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const VendorItem = ({ menuItem }) => (
  // <tr>
  //   <td>{menuItem.name}</td>
  //   <td>{menuItem.price}$</td>
  //   <td>{menuItem.dateCreated.toDateString()}</td>
  //   <td>{menuItem.image}</td>
  // </tr>
  <Card style={{ marginBottom: '20px' }}>
    <Card.Body>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Card.Title>{menuItem.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Price: {menuItem.price}$</Card.Subtitle>
          <Card.Text>
            <strong>Date Added:</strong> {menuItem.dateCreated.toDateString()}
          </Card.Text>
        </div>
        <div>
          {/* Displaying the logo on the far right with full height */}
          <Image src={menuItem.image} alt="MenuItem Image" style={{ height: '200px', width: '200px' }} />
        </div>
      </div>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
VendorItem.propTypes = {
  menuItem: PropTypes.shape({
    dateCreated: {
      type: Date,
      required: false,
    },
    name: String,
    price: {
      type: Number,
      min: 0.00,
      max: 1000.00,
    },
    image: {
      type: String,
      defaultValue: '',
      required: false,
    },
  }).isRequired,
};

export default VendorItem;
