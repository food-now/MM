import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

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
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {VendorCollection}
 */
export const vendors = new VendorCollection();
