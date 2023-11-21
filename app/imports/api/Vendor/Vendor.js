import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { MenuItems } from '../MenuItem/MenuItem';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */

class VendorCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      vendorName: String,
      owner: String,
      address: String,
      weblink: String,
      logo: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.defaultPublicationName = `${this.name}.publication.default`; // For both customers and admins.
    this.vendorPublicationName = `${this.name}.publication.vendor`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {VendorCollection}
 */
export const Vendors = new VendorCollection();

// Define write restrictions to the vendors database collection.
Vendors.collection.allow({
  // All of the parameter fields, such as userid and doc, are autofilled by meteor and are not from the clientside code. Client should use these functions as usual.
  // Doc is the document getting modified, userID is the logged in user.
  insert(userId, doc) {
    // The user must be logged in and the document must be owned by the user. Admins are an exception.
    return userId && (doc.owner === Meteor.users.findOne(userId).username || Roles.userIsInRole(userId, 'admin'));
  },

  update(userId, doc) {
    // User must be logged in. Can only change your own documents. Admins are an exception.
    return userId && (doc.owner === Meteor.users.findOne(userId).username || Roles.userIsInRole(userId, 'admin'));
  },

  remove(userId, doc) {
    // User must be logged in. Can only remove your own documents. Admins are an exception.
    return userId && (doc.owner === Meteor.users.findOne(userId).username || Roles.userIsInRole(userId, 'admin'));
  },

  fetch: ['owner'],
});
