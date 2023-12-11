import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const CustomerItem = ({ customer, onDelete }) => {
  const handleDelete = () => {
    onDelete(customer._id); // Pass the customer ID to the onDelete function
  };
  return (
    <tr>
      <td>{customer.customerName}</td>
      <td>{customer.owner}</td>
      <td>
        <img src={customer.profilePic} alt="Profile" style={{ width: '75px', height: '75px' }} />
      </td>
      <td>
        <Button onClick={handleDelete}>Delete</Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
CustomerItem.propTypes = {
  customer: PropTypes.shape({
    customerName: PropTypes.string,
    owner: PropTypes.number,
    profilePic: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CustomerItem;
