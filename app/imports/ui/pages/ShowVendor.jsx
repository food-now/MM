import React from 'react';
import { Container, Row } from 'react-bootstrap';
// import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Vendors } from '../../api/Vendor/Vendor';
import { MenuItems } from '../../api/MenuItem/MenuItem';
import VendorItem from '../components/VendorItem';

// const bridge = new SimpleSchema2Bridge(MenuItems.schema);

/* Renders the EditStuff page for editing a single document. */
const ShowVendor = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendorTarget, menuItems } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.defaultPublicationName);
    const subscription2 = Meteor.subscribe(MenuItems.defaultPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the document
    const targetVendor = Vendors.collection.findOne(_id);
    const vendorName = targetVendor ? targetVendor.vendorName : ''; // Extract vendorName

    // Fetch menu items for the specific vendorName
    const listMenuItems = MenuItems.collection.find({ vendorName }).fetch();
    console.log(listMenuItems);
    return {
      vendorTarget: vendorName,
      menuItems: listMenuItems,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  // const submit = (data) => {
  //   const { name, quantity, condition } = data;
  //   Stuffs.collection.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
  //     swal('Error', error.message, 'error') :
  //     swal('Success', 'Item updated successfully', 'success')));
  // };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <b>{vendorTarget}</b>
        {menuItems.map((item) => (
          <VendorItem key={item._id} menuItem={item} /> // Adjust this line according to your VendorItem component
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ShowVendor;
