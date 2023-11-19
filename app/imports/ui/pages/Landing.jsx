import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import InteractiveMap from '../components/InteractiveMap';

const Landing = () => (

  <div>
    <div className="landing-picback" />

    <div>
      <Container className="p-3">

        <Row className="align-middle text-center pb-3">
          <Col>
            <h1>
              Welcome to
              {' '}
              <Image
                src="https://media.discordapp.net/attachments/1171567131977068675/1172018671007301732/Food_Now_Logo_1.png?ex=655eca72&is=654c5572&hm=30da1d3d7f91e9c61457bd049a0cbe1734d7eaa3d5c10be1beebec254778664d&=&width=792&height=792"
                alt="logo"
                style={{ width: '100px', height: '100px' }}
              />
            </h1>
            <h2>Looking for some grindz on Campus but don&apos;t where to go? We can help!</h2>
            <h3 className="pt-2">Food now allows you to search by....</h3>
          </Col>
        </Row>

        <Row className="align-middle text-center">
          <Col xs={4}>
            <div className="pt-2" >
              <img src="images/BeFunky-collage.jpg" class="rounded img-fluid"  alt="VendorCollage"/>
              <h1>Vendor List</h1>
              <h5>List of all food options on campus. </h5>
            </div>
          </Col>

          <Col xs={4}>
            <div className="pt-2">
              <img src="images/fsvendormap.jpg" className="rounded img-fluid" alt="VendorMapImg"/>
              <h1>Vendor Map</h1>
              <h5>View food options on Campus Map.</h5>
            </div>
          </Col>

          <Col xs={4}>
            <div className="pt-2">
              <img src="images/Foodlnl.jpg" className="rounded img-fluid" alt="CusineTypeImage"/>
              <h1>Cuisine Type</h1>
              <h5>Search vendors by cuisine type.</h5>
            </div>
          </Col>
        </Row>

        <Row className="align-middle text-center pt-3">
          <Col>
            <h3 className="pb-2">And more!...</h3>
            <h4>Create an acount now to find your next meal!</h4>
          </Col>
        </Row>

        <Row className="align-middle text-center pt-3">
          <Col>
            <button type="button" className="btn btn-outline-success btn-lg">Login</button>
          </Col>
        </Row>

      </Container>

    </div>
    <InteractiveMap />
  </div>
);

export default Landing;
