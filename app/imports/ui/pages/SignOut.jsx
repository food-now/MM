import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Image } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <div>
      <Col id="signout-page" className="text-center py-3">
        <h1>Sign out successful!</h1>
        <h4 className="pb-3">You have have sucessfully signed out of the application.</h4>
        <Image
          src="https://media.discordapp.net/attachments/1171567131977068675/1172018671007301732/Food_Now_Logo_1.png?ex=655eca72&is=654c5572&hm=30da1d3d7f91e9c61457bd049a0cbe1734d7eaa3d5c10be1beebec254778664d&=&width=792&height=792"
          alt="logo"
          style={{ width: '500px', height: '500px' }}
        />
      </Col>
    </div>
  );
};

export default SignOut;
