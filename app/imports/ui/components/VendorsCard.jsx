// import React from 'react';
//
// const VendorsCard = ({ name, description, image }) => {
//   return (
//     <div className="card">
//       <img src={image} className="card-img-top" alt={name} />
//       <div className="card-body">
//         <h5 className="card-title">{name}</h5>
//         <p className="card-text">{description}</p>
//       </div>
//     </div>
//   );
// };
//
// export default VendorsCard;

// CardComponent.js
import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const VendorsCard = ({ vendor }) => (
  <Card style={{ marginBottom: '20px' }}>
    <Card.Body>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Card.Title>{vendor.vendorName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Owner: {vendor.owner}</Card.Subtitle>
          <Card.Text>
            <strong>Address:</strong> {vendor.address}
          </Card.Text>
          <Link to={`/show-vendor/${vendor._id}`}>
            <button type="button" className="btn btn-outline-success btn-lg">View Menu</button>
          </Link>
        </div>
        <div>
          {/* Displaying the logo on the far right with full height */}
          <Image src={vendor.logo} alt="Vendor Logo" style={{ height: '200px', width: '200px' }} />
        </div>
      </div>
    </Card.Body>
  </Card>
);

VendorsCard.propTypes = {
  vendor: PropTypes.shape({
    vendorName: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    weblink: PropTypes.string.isRequired,
    logo: {
      type: String,
      required: false,
    },
    _id: PropTypes.string,
  }).isRequired,
};
export default VendorsCard;
