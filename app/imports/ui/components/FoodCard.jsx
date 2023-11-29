// import React from 'react';
//
// const FoodCard = ({ name, description, image }) => {
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
// export default FoodCard;

import React from 'react';
import PropTypes from 'prop-types';

const FoodCard = ({ name, description, image }) => (
  <div className="card">
    <img src={image} className="card-img-top" alt={name} />
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{description}</p>
    </div>
  </div>
);

FoodCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FoodCard;
