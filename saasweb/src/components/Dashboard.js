import React from 'react';
import {
    Container,
    Row
} from 'reactstrap';
import SidebarContainer from '../containers/SidebarContainer';
import {Redirect} from 'react-router-dom'
import MainPanelContainer from '../containers/MainPanelContainer'
import {LANDING} from '../constants/routes'




const Dashboard = ({signedIn}) => (
    <>
    {signedIn ? (
    <Container fluid style={{height: "100vh"}}>
        <Row style={{height: "100vh"}}>
            <SidebarContainer />
            <MainPanelContainer />
        </Row>
    </Container>)
    : 
        <Redirect to={LANDING} />
    }
    </>
);





export default (Dashboard);