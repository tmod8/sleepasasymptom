import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand
  } from 'reactstrap';

import { AuthUserContext } from '../Session';

import LogoutButton from '../Logout';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
        </AuthUserContext.Consumer>
    </div>
    
);

const NavigationAuth = () => (
    <Navbar color="dark" className="text-white">
        <NavbarBrand>SAAS</NavbarBrand>
        <Nav className="ml-auto">
            <LogoutButton />
        </Nav>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar color="dark" className="text-white">
        <NavbarBrand>SAAS</NavbarBrand>
        <Nav className="ml-auto">
        </Nav>
    </Navbar>
);

export default Navigation;