import React, { useState } from 'react';
import { Card, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { vendors } from '../../api/Vendor/Vendor';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  /* For Users */
  /* For Vendors */
  vendorName: String,
  owner: String,
  address: String,
  weblink: String,
  logo: String,
  email: String,
  password: String,
  /* For Admin */
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddUsers = () => {

  const [selectedOption, setSelectedOption] = useState(''); // State to manage selected option

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option state
  };

  const renderFields = () => {
    if (selectedOption === '1') {
      return (
        <>
          <TextField name="email">Email</TextField>
          <TextField name="password">Password</TextField>
        </>
      );
    } if (selectedOption === '2') {
      return (
        <>
          <TextField name="vendorName" />
          <TextField name="address" />
          <TextField name="weblink" />
          <TextField name="logo" />
          <TextField name="email">Email</TextField>
          <TextField name="password">Password</TextField>
        </>
      );
    } if (selectedOption === '3') {
      return (
        <>
          <TextField name="email">Email</TextField>
          <TextField name="password">Password</TextField>
        </>
      );
    }

    return null;
  };

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { vendorName, address, weblink, logo, email, password } = data;
    const owner = Meteor.user().username;
    vendors.collection.insert(
      { vendorName, address, weblink, logo, owner, email, password },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'User added successfully', 'success');
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
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card bg="dark" text="white" border="success" className="justify-content-center">
              <Card.Body>
                <Card.Header className="text-center fs-5">Add User</Card.Header>
                <FormSelect name="owner" onChange={handleSelectChange}>
                  <option>Select User Type</option>
                  <option value="1">Customer</option>
                  <option value="2">Vendor</option>
                  <option value="3">Admin</option>
                </FormSelect>
                <div className="py-3">
                  {renderFields()} {/* Render fields based on selected option */}
                </div>
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

export default AddUsers;
