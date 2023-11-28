import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const CustomerItem = ({ customer }) => (
  <tr>
    <td>{customer.customerName}</td>
    <td>{customer.owner}</td>
    <td>
      <img src={customer.profilePic} alt="Profile" style={{ width: '75px', height: '75px' }} />
    </td>
  </tr>
);

// Require a document to be passed to this component.
CustomerItem.propTypes = {
  customer: PropTypes.shape({
    customerName: PropTypes.string,
    owner: PropTypes.number,
    profilePic: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default CustomerItem;
