import React from 'react';
import PropTypes from 'prop-types';

const RecentlyOrderedCard = ({ points, place, time, items, username }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Username: {username}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Manoa Points: {points}</h6>
      <p className="card-text">Ordered from: {place}</p>
      <p className="card-text">Ordered {time} ago</p>
      <p className="card-text">Items Ordered:</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

RecentlyOrderedCard.propTypes = {
  points: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired, // Add this prop type
};

export default RecentlyOrderedCard;
