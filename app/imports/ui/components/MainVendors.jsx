import React from 'react';

const MainVendors = () => {
  const vendorsData = [
    {
      name: 'Vendor 1',
      description: 'Description for Vendor 1',
      image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2023/01/panda_logo.png',
    },
    {
      name: 'Vendor 2',
      description: 'Description for Vendor 2',
      image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2020/05/landl_logo.png',
    },
    {
      name: 'Vendor 2',
      description: 'Description for Vendor 2',
      image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2020/05/landl_logo.png',
    },
    {
      name: 'Vendor 2',
      description: 'Description for Vendor 2',
      image: 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2020/05/landl_logo.png',
    },
    // Add data for other vendors
  ];

  return (
    <div>
      <h2>Popular Vendors</h2>
      <div className="row">
        {vendorsData.map((vendor, index) => (
          <div className="col-md-3" key={index} />
        ))}
      </div>
    </div>
  );
};

export default MainVendors;
