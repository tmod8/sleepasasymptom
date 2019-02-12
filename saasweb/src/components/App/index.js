import React from 'react';
import { 
  BrowserRouter as Router,
  Route
 } from 'react-router-dom';

import { withAuthentication } from '../Session';

import Navigation from '../Navigation';
import LoginPage from '../LoginPage';
import RegistrationPage from '../RegistrationPage';
import Dashboard from '../Dashboard';

import * as ROUTES from '../../constants/routes';


const App = () => (
    <Router>
      <div>
        <Navigation />

        <Route exact path={ROUTES.LANDING} component={LoginPage} />
        <Route path={ROUTES.REGISTER} component={RegistrationPage} />
        <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      </div>   
    </Router>
);

export default withAuthentication(App);
