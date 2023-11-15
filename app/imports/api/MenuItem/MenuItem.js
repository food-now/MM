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
    /* Define the structure of each document in the collection.
       All fields are required unless specified otherwise. */
    this.schema = new SimpleSchema(
      {
        owner: String,
        dateCreated: Date,
        vendorName: String,
        name: String,
        price: Number,
        allergens: [String],
        daysOfWeekAvaliable: [String],
        special: Boolean,
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
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the MenuItemsCollection.
 * @type {MenuItemsCollection}
 */
export const MenuItems = new MenuItemsCollection();
