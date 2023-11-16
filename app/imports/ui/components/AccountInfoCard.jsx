import React from 'react';
import { Meteor } from 'meteor/meteor';

Meteor.subscribe('userData');
const currentUser = Meteor.user();
console.log(currentUser);
const AccountInfoCard = () => (
  <div className="card">
    <div className="card-body">
      <h3 className="card-text">Name:</h3>
      <h3 className="card-text">Email:</h3>
      <h3 className="card-text">Account Type:</h3>
    </div>
  </div>
);

export default AccountInfoCard;
