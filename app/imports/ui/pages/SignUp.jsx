import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Customers } from '../../api/Customer/Customer';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const handleInsertResult = (e, formRef) => {
    if (error) {
      swal('Error', error.message, 'error');
    } else {
      swal('Success', 'User added successfully', 'success');
      formRef.reset();
    }
  };

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc, formRef) => {
    const { email, password } = doc;
    const owner = email;
    const userData = { owner, email, password, customerName: 'New User', profilePic: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=' };

    Accounts.createUser({ email, username: email, password, role: 'customer' }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
        // Move the insert call inside the callback
        Customers.collection.insert(userData, (e) => {
          handleInsertResult(e, formRef);
        });
      }
    });
    console.log('USER INSERTED!!!!');
  };
  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <div className="sign-picback">
      <Container id="signup-page" className="py-5">
        <Row className="justify-content-center">
          <Col xs={5}>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <Card bg="dark" text="white" border="success" className="justify-content-center">
                <Card.Body>
                  <Card.Header className="text-center fs-5">Register your account</Card.Header>
                  <TextField name="email" placeholder="E-mail address" />
                  <TextField name="password" placeholder="Password" type="password" />
                  <ErrorsField />
                  <SubmitField />
                </Card.Body>
              </Card>
            </AutoForm>
            <Alert variant="success">
              Already have an account? Login
              {' '}
              <Link to="/signin">here</Link>
            </Alert>
            {error === '' ? (
              ''
            ) : (
              <Alert variant="danger">
                <Alert.Heading>Registration was not successful</Alert.Heading>
                {error}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
