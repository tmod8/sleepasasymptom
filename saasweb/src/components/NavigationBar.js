import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand
  } from 'reactstrap';

import Logout from '../containers/Logout'

const NavigationBar = ({signedIn}) => (
    
    
    <Navbar color="dark" className="text-white">
        <NavbarBrand>SAAS</NavbarBrand>
        <Nav className="ml-auto">
            {signedIn ? <Logout /> : null}
        </Nav>
    </Navbar>
     
);



export default NavigationBar;