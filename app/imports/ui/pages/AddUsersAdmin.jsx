import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vendors } from '../../api/Vendor/Vendor';
import { Customers } from '../../api/Customer/Customer';
import { Admins } from '../../api/Admin/Admin';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  /* For Users */
  /* For Vendors */
  email: String,
  password: String,
  vendorName: { type: String, optional: true },
  customerName: { type: String, optional: true },
  adminName: { type: String, optional: true },
  address: { type: String, optional: true },
  weblink: { type: String, optional: true },
  logo: { type: String, optional: true },
  profilePic: { type: String, optional: true },
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
          <TextField name="customerName">Customer Name</TextField>
          <TextField name="email">Email</TextField>
          <TextField name="password">Password</TextField>
          <TextField name="profilePic">Profile Picture</TextField>
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
          <TextField name="adminName">Admin Name</TextField>
          <TextField name="email">Email</TextField>
          <TextField name="password">Password</TextField>
          <TextField name="profilePic">Profile Picture</TextField>
        </>
      );
    }

    return null;
  };

  const handleInsertResult = (error, formRef) => {
    if (error) {
      swal('Error', error.message, 'error');
    } else {
      swal('Success', 'User added successfully', 'success');
      formRef.reset();
    }
  };
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { email, password } = data;

    if (selectedOption === '1') {
      // Customer or Admin
      const { customerName, profilePic } = data;
      const owner = email; // Use the email as the owner
      const userData = { owner, email, password, customerName, profilePic };

      // Check if required fields are filled
      if (!customerName || !profilePic) {
        swal('Error', 'Please fill in all customer-specific fields', 'error');
        return;
      }
      // Insert into collection using userData
      Customers.collection.insert(userData, (error) => {
        handleInsertResult(error, formRef);
      });

      Meteor.call('createUserOnServer', email, password, 'customer', (error, result) => {
        if (error) {
          console.error('Error creating user:', error.reason);
        } else {
          console.log('User created successfully:', result);
        }
      });
    } else if (selectedOption === '2') {
      // Vendor
      const { vendorName, address, weblink, logo } = data;
      const owner = email; // Use the email as the owner
      // Check if required fields are filled
      if (!vendorName || !address || !weblink || !logo) {
        swal('Error', 'Please fill in all vendor-specific fields', 'error');
        return;
      }
      const vendorData = { vendorName, address, weblink, logo, owner, email, password };

      // Insert into collection using vendorData
      Vendors.collection.insert(vendorData, (error) => {
        handleInsertResult(error, formRef);
      });
      Meteor.call('createUserOnServer', email, password, 'vendor', (error, result) => {
        if (error) {
          console.error('Error creating user:', error.reason);
        } else {
          console.log('User created successfully:', result);
        }
      });
    } else if (selectedOption === '3') {
      // Admin
      const { adminName, profilePic } = data;
      const owner = email; // Use the email as the owner
      const adminData = { owner, email, password, profilePic, adminName };

      // Check if required fields are filled
      if (!adminName || !email || !password || !profilePic) {
        swal('Error', 'Please fill in all admin-specific fields', 'error');
        return;
      }
      // Insert into a different collection for admins
      // Replace 'Admins' with the actual collection name for admins
      Admins.collection.insert(adminData, (error) => {
        handleInsertResult(error, formRef);
      });
      Meteor.call('createUserOnServer', email, password, 'admin', (error, result) => {
        if (error) {
          console.error('Error creating user:', error.reason);
        } else {
          console.log('User created successfully:', result);
        }
      });
    }
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="AddUser-page" className="py-3">
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
