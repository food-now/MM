import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
/**
 * The MenuItemsCollection. It encapsulates state and variable values for menu items.
 */
class MenuItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'MenuItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);

    // we are going to want to subscribe to vendors and filter out all vendor names
    const vendors = ['test1', 'test2', 'test3'];
    const vendorList = [];
    vendors.forEach(function (element) {
      vendorList.push({ label: element, value: element });
    });

    const allergen = ['a', 'b', 'c'];
    const allergenList = [];
    allergen.forEach(function (element) {
      allergenList.push({ label: element, value: element });
    });
    /* Define the structure of each document in the collection.
       All fields are required unless specified otherwise. */
    this.schema = new SimpleSchema(
      {
        owner: String,
        dateCreated: Date,
        vendorName: {
          type: String,
          allowedValues: vendors,
          defaultValue: vendors[0],
        },
        name: String,
        price: {
          type: Number,
          min: 0.00,
          max: 1000.00,
        },
        allergens: [String],
        daysOfWeekAvaliable: [String],
        special: {
          type: Boolean,
          required: false,
        },
        specialDate: Date,
        image: {
          type: String,
          defaultValue: '',
          required: false,
        },
      },
      { requiredByDefault: true },
    );
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.defaultPublicationName = `${this.name}.publication.default`; // For both customers and admins.
    this.vendorPublicationName = `${this.name}.publication.vendor`;
  }
}

/**
 * The singleton instance of the MenuItemsCollection.
 * @type {MenuItemsCollection}
 */
export const MenuItems = new MenuItemsCollection();

// Define write restrictions to the MenuItems database collection.
MenuItems.collection.allow({
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
