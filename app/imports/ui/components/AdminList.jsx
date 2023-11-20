import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Admins } from '../../api/Admin/Admin';
import AdminItem from './AdminItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const AdminList = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, admins } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Admins.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const adminItems = Admins.collection.find({}).fetch();
    return {
      admins: adminItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>All Vendor Accounts</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Email</th>
                <th>Profile Picture</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => <AdminItem key={admin._id} admin={admin} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminList;
