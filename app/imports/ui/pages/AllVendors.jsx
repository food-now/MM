import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

const ListStuff = () => (
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
);

export default ListStuff;
