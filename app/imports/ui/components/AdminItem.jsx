import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AdminItem = ({ admin }) => (
  <tr>
    <td>{admin.adminName}</td>
    <td>{admin.owner}</td>
    <td>
      <img src={admin.profilePic} alt="Admin Profile" style={{ width: '75px', height: '75px' }} />
    </td>
  </tr>
);

// Require a document to be passed to this component.
AdminItem.propTypes = {
  admin: PropTypes.shape({
    adminName: PropTypes.string,
    owner: PropTypes.number,
    profilePic: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminItem;
