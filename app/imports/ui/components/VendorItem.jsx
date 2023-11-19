import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const VendorItem = ({ vendor }) => (
  <tr>
    <td>{vendor.vendorName}</td>
    <td>{vendor.owner}</td>
    <td>{vendor.address}</td>
    <td>
      <a href={vendor.weblink} target="_blank" rel="noreferrer">
        Website
      </a>
    </td>
    <td>
      <img src={vendor.logo} alt="Vendor Logo" style={{ width: '75px', height: '75px' }} />
    </td>
  </tr>
);

// Require a document to be passed to this component.
VendorItem.propTypes = {
  vendor: PropTypes.shape({
    vendorName: PropTypes.string,
    owner: PropTypes.number,
    address: PropTypes.string,
    _id: PropTypes.string,
    weblink: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
};

export default VendorItem;
