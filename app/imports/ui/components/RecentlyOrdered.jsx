import React from 'react';
import RecentlyOrderedCard from './RecentlyOrderedCard';

const MainRecentlyOrdered = () => {
  const recentOrdersData = [
    {
      username: 'user1',
      points: 500,
      place: 'Restaurant A',
      time: '2 hours',
      items: ['Item 1', 'Item 2'],
    },
    {
      username: 'user2',
      points: 300,
      place: 'Restaurant B',
      time: '1 hour',
      items: ['Item 3'],
    },
    {
      username: 'user2',
      points: 300,
      place: 'Restaurant B',
      time: '1 hour',
      items: ['Item 3'],
    },
    {
      username: 'user2',
      points: 300,
      place: 'Restaurant B',
      time: '1 hour',
      items: ['Item 3'],
    },
    // Add data for other recently ordered items
  ];

  return (
    <div>
      <h2>Recent Student Orders</h2>
      <div className="row">
        {recentOrdersData.map((order, index) => (
          <div className="col-md-3" key={index}>
            <RecentlyOrderedCard
              points={order.points}
              place={order.place}
              time={order.time}
              items={order.items}
              username={order.username} // Pass the username prop
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainRecentlyOrdered;
