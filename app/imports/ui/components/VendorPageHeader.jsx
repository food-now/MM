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
import { Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const VendorHeader = ({ vendor }) => (
  <Container>
    <Row className="header-row">
      <h1 style={{ width: 'auto', fontSize: '70px' }}>
        {vendor.vendorName}
      </h1>
      <Image src={vendor.logo} alt="Vendor Logo" style={{ height: 'auto', width: 'auto', maxHeight: '200px' }} />
    </Row>
  </Container>
);

VendorHeader.propTypes = {
  vendor: PropTypes.shape({
    vendorName: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
};
export default VendorHeader;
