import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import InteractiveMap from '../components/InteractiveMap';
import { Vendors } from '../../api/Vendor/Vendor';
import VendorFilter from '../components/VendorFilter';
import VendorsCard from '../components/VendorsCard';

const ListStuff = () => {
  const { ready, vendors } = useTracker(() => {
    const subscription = Meteor.subscribe(Vendors.defaultPublicationName);
    const rdy = subscription.ready();
    const vendorsCol = Vendors.collection.find({}).fetch();
    return {
      vendors: vendorsCol,
      ready: rdy,
    };
  }, []);

  return (
    ready ? (
      <Container fluid className="py-5">
        <Row>
          {/* Left Block for Filters */}
          <Col md={2}>
            {/* Your filter components go here */}
            <VendorFilter />
            {/* Add your other filter components or content here */}
          </Col>

          {/* Middle Block for Section */}
          <Col md={6}>
            {/* Your main section components go here */}
            <h1>Vendors Available at UH Manoa</h1>
            {vendors.map((vendor, index) => (
              <VendorsCard vendor={vendor} key={index} />
            ))}
            {/* Add your main section components or content here */}
          </Col>

          {/* Right Block for Section */}
          <Col md={3}>
            {/* Your right section components go here */}
            <h2>Find Your Favorite Spots</h2>
            <InteractiveMap />
            {/* Add your right section components or content here */}
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ListStuff;
