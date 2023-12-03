import React from 'react';
import { Container } from 'react-bootstrap';
import VendorList from '../components/VendorList';
import CustomerList from '../components/CustomerList';
import AdminList from '../components/AdminList';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const UserList = () => (
  <Container id="AllUsers-page">
    <VendorList />
    <CustomerList />
    <AdminList />
  </Container>
);

export default UserList;
