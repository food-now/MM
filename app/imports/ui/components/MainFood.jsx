import React from 'react';
import FoodCard from './FoodCard';

const MainFood = () => {
  const foodData = [
    {
      name: 'Food Item 1',
      description: 'Description for Food Item 1',
      image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/dunkin_small.jpg',
    },
    {
      name: 'Food Item 2',
      description: 'this is a description',
      image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/holoholo_small.jpg',
    },
    {
      name: 'Food Item 2',
      description: 'this is a description',
      image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/holoholo_small.jpg',
    },
    {
      name: 'Food Item 2',
      description: 'this is a description',
      image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/holoholo_small.jpg',
    },
    // Add data for other food items
  ];

  return (
    <div>
      <h2>Popular Food Items</h2>
      <div className="row">
        {foodData.map((food, index) => (
          <div className="col-md-3" key={index}>
            <FoodCard name={food.name} description={food.description} image={food.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFood;
