import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Vendors } from '../../api/Vendor/Vendor';
import VendorUser from './VendorUser';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const VendorList = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendors } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorItems = Vendors.collection.find({}).fetch();
    return {
      vendors: vendorItems,
      ready: rdy,
    };
  }, []);

  const deleteVendor = (vendorId, vendorOwner, vendorName, vendorLogo) => {
    Meteor.call('getAllUsers', (error, result) => {
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        console.log('All Meteor Users:', result);
        const user = result.find(obj => obj.username === vendorOwner);
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
          Meteor.call('addCustomer', vendorName, vendorOwner, vendorLogo, (customerError, customerId) => {
            if (customerError) {
              console.error('Error adding customer:', customerError);
            } else {
              console.log('Customer added with ID:', customerId);
            }
          });
          Vendors.collection.remove({ _id: vendorId });

          console.log('User found with email:', vendorOwner);
        } else {
          console.error('User not found with email:', vendorOwner);
        }
      }
    });
  };
  // console.log('ready', ready, vendors);
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
                <th>Vendor Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Website</th>
                <th>Logo</th>
                <th>Delete Options</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <VendorUser
                  key={vendor._id}
                  vendor={vendor}
                  onDelete={deleteVendor}
                />
              ))}
              { /* Deletions: Comments.update({ _id: commentId }, { $pull: { replies: { _id: replyComntID } } }) */ }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VendorList;
