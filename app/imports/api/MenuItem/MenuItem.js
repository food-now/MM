import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
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
        owner: {
          type: String,
          required: false,
        },
        dateCreated: {
          type: Date,
          required: false,
        },
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
        allergens: {
          type: String,
          required: false,
        },
        daysOfWeekAvaliable: {
          type: String,
          required: false,
        },
        special: {
          type: Boolean,
          required: false,
        },
        specialDate: {
          type: Date,
          required: false,
        },
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
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the MenuItemsCollection.
 * @type {MenuItemsCollection}
 */
export const MenuItems = new MenuItemsCollection();
