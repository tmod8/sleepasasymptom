import React, { Component } from 'react';
import {
    Col,
    Button,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';


import { Route } from 'react-router-dom';
import StudyResearchers from '../StudyResearchers';

import * as ROUTES from '../../constants/routes';

import * as ROLES from '../../constants/roles';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: props.firebase.auth.currentUser,
            user: null,
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.researchers(this.state.auth.uid).on('value', snapshot => {
            const userObj = snapshot.val();
            this.setState({
              user: userObj,
              loading: false,
            });
          });
    }

    componentWillUnmount() {
        this.props.firebase.researchers(this.state.auth.uid).off();
      }

    onClick = () => {
        this.props.history.push(ROUTES.CREATE_STUDY);
    }

    render() {
        const {
            user
        } = this.state;

        return (
            <Col md={2} className="d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        
                        <span className="d-flex align-items-center text-muted">
                            Hi {user && ' ' + user.firstName}
                        </span>
                    </h6>
                    <hr className="mb-4" />
                    
                    <Route path={ROUTES.VIEW_STUDIES} component={StudyResearchers} />
                    <hr className="mb-4" />
                    {!!user && (user.role === ROLES.ADMIN || user.role === ROLES.SUPERVISOR) && (
                        <Button outline color="secondary" size="lg" onClick={this.onClick }>Create New Study</Button>
                    )}
                </div>
            </Col>
        );
    }
}




export default withRouter(withFirebase(Sidebar));