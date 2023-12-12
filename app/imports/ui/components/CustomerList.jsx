import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Customers } from '../../api/Customer/Customer';
import CustomerItem from './CustomerItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const CustomerList = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, customers } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Customers.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const customerItems = Customers.collection.find({}).fetch();
    return {
      customers: customerItems,
      ready: rdy,
    };
  }, []);

  const deleteCustomer = (customerId) => {
    Customers.collection.remove({ _id: customerId });
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>All Customer Accounts</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Profile Picture</th>
                <th>Delete Options</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <CustomerItem
                  key={customer._id}
                  customer={customer}
                  onDelete={deleteCustomer}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default CustomerList;
