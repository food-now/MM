import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AdminItem = ({ admin, onDelete }) => {
  const handleDelete = () => {
    onDelete(admin._id, admin.owner, admin.adminName, admin.profilePic); // Pass the customer ID to the onDelete function
  };
  return (
    <tr>
      <td>{admin.adminName}</td>
      <td>{admin.owner}</td>
      <td>
        <img src={admin.profilePic} alt="Admin Profile" style={{ width: '75px', height: '75px' }} />
      </td>
      <td>
        <Button onClick={handleDelete}>Delete</Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
AdminItem.propTypes = {
  admin: PropTypes.shape({
    adminName: PropTypes.string,
    owner: PropTypes.number,
    profilePic: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminItem;
