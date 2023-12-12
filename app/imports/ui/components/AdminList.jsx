import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Admins } from '../../api/Admin/Admin';
import AdminItem from './AdminItem';
import { Vendors } from '../../api/Vendor/Vendor';

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

  const deleteAdmin = (adminId, adminOwner, adminName, adminLogo) => {
    Meteor.call('getAllUsers', (error, result) => {
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        console.log('All Meteor Users:', result);
        const user = result.find(obj => obj.username === adminOwner);
        // result.findOne({ username: vendorOwner });

        if (user) {
          Meteor.call('resetRoles', user._id, 'vendor', (resetError, resetResult) => {
            if (resetError) {
              console.error('Error resetting roles:', resetError);
            } else {
              console.log('User roles reset successfully:', resetResult);
            }
          });
          // customerName: String,
          //   owner: String,
          //   profilePic: String,
          Meteor.call('addCustomer', adminName, adminOwner, adminLogo, (customerError, customerId) => {
            if (customerError) {
              console.error('Error adding customer:', customerError);
            } else {
              console.log('Customer added with ID:', customerId);
            }
          });
          Vendors.collection.remove({ _id: adminId });
          console.log('User found with email:', adminOwner);
        } else {
          console.error('User not found with email:', adminOwner);
        }
      }
    });
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>All Admin Accounts</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Email</th>
                <th>Profile Picture</th>
                <th>Delete Options</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => <AdminItem key={admin._id} admin={admin} onDelete={deleteAdmin} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminList;
