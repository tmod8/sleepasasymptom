import React from 'react';
import {
    Container,
    Row
} from 'reactstrap';
import MainPanel from '../MainPanel';

import { withAuthorization } from '../Session';
import { withRouter } from 'react-router-dom';

import Sidebar from '../Sidebar';

const Dashboard = () => (
    <Container fluid style={{height: "100vh"}}>
        <Row style={{height: "100vh"}}>
            
            
            <Sidebar /> 
            <MainPanel />
        </Row>
    </Container>
    
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withRouter(Dashboard));
