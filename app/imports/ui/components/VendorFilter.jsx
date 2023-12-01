import React, { useState } from 'react';
import PropTypes from 'prop-types';

const VendorFilter = ({ onFilterChange }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientChange = (ingredient) => {
    const updatedIngredients = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter((selected) => selected !== ingredient)
      : [...selectedIngredients, ingredient];
    setSelectedIngredients(updatedIngredients);
    onFilterChange(updatedIngredients);
  };

  return (
    <div className="vendor-filter">
      <h2>Filters</h2>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Food Ingredients:</label>
        <div>
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Japanese', 'American', 'Korean', 'Vietnamese', 'Desserts', 'Smoothies', 'Subs'].map((ingredient) => (
            <div key={ingredient}>
              <input
                type="checkbox"
                id={ingredient}
                checked={selectedIngredients.includes(ingredient)}
                onChange={() => handleIngredientChange(ingredient)}
              />
              <label htmlFor={ingredient}>{ingredient}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

VendorFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default VendorFilter;
