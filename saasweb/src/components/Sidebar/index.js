import React from 'react';
import {
    Col,
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import { AuthUserContext } from '../Session';

const Sidebar = () => (
    <Col md={2} className="d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Profile</span>
                <span className="d-flex align-items-center text-muted">
                    <i className="fa fa-edit">Edit</i>
                </span>
            </h6>
            <AuthUserContext.Consumer>
                {authUser => (
                <ListGroup flush className="flex-column">
                    <ListGroupItem>Full Name</ListGroupItem>
                    <ListGroupItem>{ authUser.email }</ListGroupItem>     
                </ListGroup>
                )}
            </AuthUserContext.Consumer>
            <hr className="mb-4" />
            <Button outline color="secondary" size="lg">Create New Study</Button>

        </div>
    </Col>
);

export default Sidebar;