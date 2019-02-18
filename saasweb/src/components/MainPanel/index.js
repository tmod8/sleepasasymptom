import React, { Component} from 'react';
import {
    ButtonToolbar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';


import { withFirebase } from '../Firebase';

import CreateStudy from '../CreateStudy';
import ViewStudies from '../ViewStudies';
import Profile from '../Profile';
import ViewResearchers from '../ViewResearchers';

import { Route, Switch, Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

var navStyle = { 
    padding: '15px', 
    display: 'inline-block', 
    lineHeight: '20px' 
};



class MainPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        this.getUser()
    }
    
    getUser = () => {
        this.props.firebase.researchers(this.props.firebase.auth.currentUser.uid).once('value', async snapshot => {
            const user = snapshot.val()

            if (!!user) {
                await this.setState({
                    currentUser: user
                })
                console.log(this.state.currentUser)
            }
        })
    }
    

    render() {
        const {
            currentUser
        } = this.state;

        return(
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 bg-white">
                <div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                        <Nav>
                            <NavItem style={ navStyle } active>
                                    <Link to={ROUTES.VIEW_STUDIES}>Studies</Link>    
                            </NavItem>
                            <NavItem style={ navStyle }>
                                <Link to={ROUTES.PROFILE}>Profile</Link>
                                
                            </NavItem>
                            {!!currentUser && (currentUser.role === ROLES.ADMIN) && (
                                <NavItem style={navStyle}>
                                    <Link to={ROUTES.VIEW_RESEARCHERS} > Researchers </Link>
                                </NavItem>
                            )}
                        </Nav>
                        {/* may use for filtering <ButtonToolbar className="mb-2 mb-md-0"></ButtonToolbar>*/}
                    </div>
                    <Switch>
                        <Route path={ROUTES.VIEW_RESEARCHERS} component={ViewResearchers} />
                        <Route path={ROUTES.CREATE_STUDY} component={CreateStudy} />
                        <Route path={ROUTES.VIEW_STUDIES} component={ViewStudies} />
                        <Route path={ROUTES.PROFILE} component={Profile} />      
                        <Route component={ViewStudies} />
                    </Switch>
                </div>
            </main>
        );
    }
    
}

export default withFirebase(MainPanel);