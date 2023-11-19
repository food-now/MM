import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import SimpleSchema from 'simpl-schema';
// import SimpleSchema from 'simpl-schema';
import { MenuItems } from '../../api/MenuItem/MenuItem';

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
// Create a schema to specify the structure of the data to appear in the form.
// TODO: CREATE APPLY EVERYTHING FROM SCHEMA INTO LIST
const formSchema = MenuItems.schema;

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddItem = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { vendorName, name, price, special, specialDate, image, allergens } = data;
    const owner = Meteor.user().username;
    const dateCreated = new Date();
    // console.log(dateCreated);
    // TODO: IMPLEMENT THE REST OF THE INFO FOR INSERTION OR MAKE THINGS OPTIONAL FOR TESTING
    MenuItems.collection.insert(
      { vendorName, name, price, special, dateCreated, image, owner, specialDate, allergens },
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
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <NumField name="price" decimal={2} />
                <TextField name="image" />
                <SelectField name="vendorName" />
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
  );
};

export default AddItem;
