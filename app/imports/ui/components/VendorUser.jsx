import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const VendorUser = ({ vendor, onDelete }) => {
  const handleDelete = () => {
    onDelete(vendor._id, vendor.owner, vendor.vendorName, vendor.logo); // Pass the customer ID to the onDelete function
  };
  return (
    <tr>
      <td>{vendor.vendorName}</td>
      <td>{vendor.owner}</td>
      <td>{vendor.address}</td>
      <td>{vendor.weblink}</td>
      <td>
        <img src={vendor.logo} alt="Vendor Profile" style={{ width: '75px', height: '75px' }} />
      </td>
      <td>
        <Button onClick={handleDelete}>Delete</Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
VendorUser.propTypes = {
  vendor: PropTypes.shape({
    vendorName: PropTypes.string,
    owner: PropTypes.number,
    address: PropTypes.string,
    weblink: PropTypes.string,
    logo: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default VendorUser;
