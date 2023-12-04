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
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const VendorHeader = ({ vendor }) => (
  <Container className="py-3">
    <Row className="align-middle text-center">
      <h1>
        {vendor.vendorName}
      </h1>
    </Row>
  </Container>
);

VendorHeader.propTypes = {
  vendor: PropTypes.shape({
    vendorName: PropTypes.string,
  }).isRequired,
};
export default VendorHeader;