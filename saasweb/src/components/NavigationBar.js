import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand
  } from 'reactstrap';
import Refresh from '../containers/Refresh'

import Logout from '../containers/Logout'

const NavigationBar = ({signedIn}) => (
    
    
    <Navbar color="dark" className="text-white">
        <NavbarBrand>SAAS</NavbarBrand>
        {signedIn && <Refresh />}
        <Nav className="ml-auto">
            {signedIn && <Logout />}
        </Nav>
    </Navbar>
     
);



export default NavigationBar;