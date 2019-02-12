import React from 'react';

import {
    Container,
    Row
} from 'reactstrap'

import { withAuthorization } from '../Session';

import Sidebar from '../Sidebar';
import MainPanel from '../MainPanel';

const Dashboard = () => (
    <Container fluid style={{height: "100vh"}}>
        <Row style={{height: "100vh"}}>
            <Sidebar />
            <MainPanel />
        </Row>
    </Container>
    
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Dashboard);
