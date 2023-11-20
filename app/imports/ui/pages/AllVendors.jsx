import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorsCard from '../components/VendorsCard';
import InteractiveMap from '../components/InteractiveMap';

const testData = [
  {
    vendorName: 'Vendor 1',
    owner: 'John Doe',
    address: '123 Main Street, Cityville',
    weblink: 'http://www.vendor1.com',
    logo: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_34/1765653/squareat-inline-02-khu-210825.png',
  },
  {
    vendorName: 'Vendor 2',
    owner: 'Jane Smith',
    address: '456 Market Street, Townsville',
    weblink: 'http://www.vendor2.com',
    logo: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_34/1765653/squareat-inline-02-khu-210825.png',
  },
  {
    vendorName: 'Vendor 2',
    owner: 'Jane Smith',
    address: '456 Market Street, Townsville',
    weblink: 'http://www.vendor2.com',
    logo: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_34/1765653/squareat-inline-02-khu-210825.png',
  },
  {
    vendorName: 'Vendor 2',
    owner: 'Jane Smith',
    address: '456 Market Street, Townsville',
    weblink: 'http://www.vendor2.com',
    logo: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_34/1765653/squareat-inline-02-khu-210825.png',
  },
  // Add more test data as needed
];

const ListStuff = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container fluid className="py-5">
      <Row>
        {/* Left Block for Filters */}
        <Col md={2}>
          {/* Your filter components go here */}
          <h2>Filters</h2>
          {/* Add your filter components or content here */}
        </Col>

        {/* Middle Block for Section */}
        <Col md={6}>
          {/* Your main section components go here */}
          <h1>Vendors Available at UH Manoa</h1>
          {testData.map((vendor, index) => (
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
  ) : <LoadingSpinner />);
};

export default ListStuff;
