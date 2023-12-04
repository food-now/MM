import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, DateField, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import SimpleSchema from 'simpl-schema';
// import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import { MenuItems } from '../../api/MenuItem/MenuItem';
import { Vendors } from '../../api/Vendor/Vendor';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
// TODO: CREATE APPLY EVERYTHING FROM SCHEMA INTO LIST
// const list = ['test1', 'test2', 'test3'];
const formSchema = new SimpleSchema(
  {
    owner: {
      type: String,
      required: false,
    },
    dateCreated: {
      type: Date,
      required: false,
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

const bridge = new SimpleSchema2Bridge(formSchema);
/* Renders the AddStuff page for adding a document. */
const AddItemVendor = () => {

  const { ready, vendors } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.defaultPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorsCol = Vendors.collection.find({}).fetch();
    // console.log(vendorsCol);
    return {
      vendors: vendorsCol.map((vendor, index) => ({ value: vendor.vendorName, label: vendor.vendorName, key: index })),
      ready: rdy,
    };
  }, []);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, price, special, specialDate, image, allergens } = data;
    const owner = Meteor.user().username;
    const dateCreated = new Date();
    // console.log(dateCreated);
    // TODO: IMPLEMENT THE REST OF THE INFO FOR INSERTION OR MAKE THINGS OPTIONAL FOR TESTING
    MenuItems.collection.insert(
      { vendors, name, price, special, dateCreated, image, owner, specialDate, allergens },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (ready ? (
    <Container id="AddItem-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Food Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <NumField name="price" decimal={2} />
                <TextField name="image" />
                <BoolField name="special" />
                <DateField name="specialDate" />
                { /* <SelectField name="allergens" choices={allergenList} /> */ }
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AddItemVendor;
