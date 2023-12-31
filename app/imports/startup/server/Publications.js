import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { MenuItems } from '../../api/MenuItem/MenuItem';
import { Customers } from '../../api/Customer/Customer';
import { Vendors } from '../../api/Vendor/Vendor';
import { Admins } from '../../api/Admin/Admin';

/*    MenuItem publications   */

// Default-level publication for both customers and admins
// If logged in with customer or admin role, then publish all menu items from all vendors. Any filtering should be done on client.
// Otherwise, publish nothing.
Meteor.publish(MenuItems.defaultPublicationName, function () {
  if (this.userId && (Roles.userIsInRole(this.userId, 'customer') || Roles.userIsInRole(this.userId, 'admin') || Roles.userIsInRole(this.userId, 'vendor'))) {
    return MenuItems.collection.find();
  }
  return this.ready();
});

// Vendor-level publication.
// If logged in with vendor role, then publish all menu items owned by this vendor user.
// A vendor would only be concerned with their own menu items, so this publication is for filtration convenience, not security.
// Otherwise, publish nothing.
Meteor.publish(MenuItems.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const username = Meteor.users.findOne(this.userId).username;
    return MenuItems.collection.find({ owner: username });
  }
  return this.ready();
});

/*    Vendors publications   */

// Default-level publication for both customers and admins
// If logged in with customer or admin role, then publish all vendors. Any filtering should be done on client.
// Otherwise, publish nothing.
Meteor.publish(Vendors.defaultPublicationName, function () {
  return Vendors.collection.find();
});

// Vendor-level publication.
// If logged in and with vendor role, then publish vendors associated with the logged in vendor user.
// Again, this publication is for filtration convenience, not security.
// Otherwise, publish nothing.
Meteor.publish(Vendors.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vendors.collection.find({ owner: username });
  }
  return this.ready();
});

/*    Customers publications   */

Meteor.publish(Customers.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Customers.collection.find();
  }
  return this.ready();
});

/*    Admins publications   */

Meteor.publish(Admins.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Admins.collection.find();
  }
  return this.ready();
});

Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Vendors.collection.find();
  }
  return this.ready();
});

// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
