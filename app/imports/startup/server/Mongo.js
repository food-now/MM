import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Vendors } from '../../api/Vendor/Vendor';
import { Customers } from '../../api/Customer/Customer';
import { Admins } from '../../api/Admin/Admin';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

const addCustomerData = (data) => {
  console.log(`  Adding: ${data.customerName} (${data.owner})`);
  Customers.collection.insert(data);
};

const addVendorData = (data) => {
  console.log(`  Adding: ${data.vendorName} (${data.owner})`);
  Vendors.collection.insert(data);
};

const addAdminData = (data) => {
  console.log(`  Adding: ${data.adminName} (${data.owner})`);
  Admins.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

// Initialize the Customers Collection if empty.
if (Customers.collection.find().count() === 0) {
  if (Meteor.settings.defaultCustomers) {
    console.log('Creating default customer data.');
    Meteor.settings.defaultCustomers.forEach(data => addCustomerData(data));
  }
}

// Initialize the Vendors Collection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendorData) {
    console.log('Creating default vendor data.');
    Meteor.settings.defaultVendorData.forEach(data => addVendorData(data));
  }
}

// Initialize the Admins Collection if empty.
if (Admins.collection.find().count() === 0) {
  if (Meteor.settings.defaultAdmins) {
    console.log('Creating default admin data.');
    Meteor.settings.defaultAdmins.forEach(data => addAdminData(data));
  }
}
