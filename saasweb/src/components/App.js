import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../containers/Navigation';
import Login from '../containers/Login';
import DashboardContainer from '../containers/DashboardContainer'
import Registration from '../containers/Registration'


import * as ROUTES from '../constants/routes';
const App = () => (
    <Router>
      <>
        <Navigation />
        <Route exact path={ROUTES.LANDING} render={() => (
            <Login />
        )}/>
        <Route path={ROUTES.DASHBOARD} component={DashboardContainer} />
        <Route path={ROUTES.REGISTER} component={Registration} /> 
      </>   
    </Router>
);


export default App;