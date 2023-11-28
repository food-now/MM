import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Vendors } from '../../api/Vendor/Vendor';
import VendorItem from './VendorItem';

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
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => <VendorItem key={vendor._id} vendor={vendor} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VendorList;
