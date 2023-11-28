import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const VendorItem = ({ menuItem }) => (
  <tr>
    <td>{menuItem.name}</td>
    <td>{menuItem.price}$</td>
    <td>{menuItem.dateCreated.toDateString()}</td>
    <td>{menuItem.image}</td>
  </tr>
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
