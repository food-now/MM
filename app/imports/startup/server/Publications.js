import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { MenuItems } from '../../api/MenuItem/MenuItem';
import { vendors } from '../../api/Vendor/Vendor';

// Customer-level publication.
// If logged in with customer role, then publish all menu items from all vendors.
// Should not give customers the owner ID associated with the menu item. They can get the vendor from vendorName field.
// Otherwise, publish nothing.
Meteor.publish(MenuItems.customerPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'customer')) {
    return MenuItems.collection.find({}, {
      fields: {
        owner: false,
      },
    });
  }
  return this.ready();
});

// Vendor-level publication.
// If logged in with vendor role, then publish all menu items owned by this vendor user.
// Otherwise, publish nothing.
Meteor.publish(MenuItems.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const userID = Meteor.users.findOne(this.userId)._id;
    return MenuItems.collection.find({ owner: userID });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(MenuItems.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return MenuItems.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
