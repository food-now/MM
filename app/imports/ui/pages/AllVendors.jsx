import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
// import VendorsCard from '../components/VendorsCard';
import InteractiveMap from '../components/InteractiveMap';
import { Vendors } from '../../api/Vendor/Vendor';
// import { Stuffs } from '../../api/stuff/Stuff';
import { MenuItems } from '../../api/MenuItem/MenuItem';
import VendorsCard from '../components/VendorsCard';

const ListStuff = () => {
  const { ready, vendors } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.defaultPublicationName);
    const subscription2 = Meteor.subscribe(MenuItems.defaultPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2;
    console.log('Subscription ready:', subscription.ready());
    console.log('Subscription error:', subscription.error);
    // Get the Stuff documents
    const vendorsCol = Vendors.collection.find({}).fetch();
    console.log(vendorsCol);
    const foodItems = MenuItems.collection.find({}).fetch();
    return {
      vendors: vendorsCol,
      items: foodItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="AllVendors-page" fluid className="py-5 px-5">
      <Row>
        {/* Middle Block for Section */}
        <Col md={6}>
          {/* Your main section components go here */}
          <h1 className="">Vendors Available at UH Manoa</h1>
          <div className="vendor-list">
            {vendors.map((vendor, index) => (
              <VendorsCard vendor={vendor} key={index} />
            ))}
          </div>
          {/* Add your main section components or content here */}
        </Col>

        {/* Right Block for Section */}
        <Col className="col-4 py-2">
          {/* Your right section components go here */}
          <h1 className="">Find Your Favorite Spots</h1>
          <InteractiveMap />
          {/* Add your right section components or content here */}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStuff;
