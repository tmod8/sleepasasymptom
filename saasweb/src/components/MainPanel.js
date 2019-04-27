import React from 'react'
import {
    Nav,
    NavItem
} from 'reactstrap'
import {Switch, Route, Link} from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import {ADMIN} from '../constants/roles'
import PropTypes from 'prop-types'
import StudiesListContainer from '../containers/StudiesListContainer'
import CreateStudy from '../containers/CreateStudy'
import ResearchersListContainer from '../containers/ResearchersListContainer'
import Profile from '../containers/Profile'
import EditStudy from '../containers/EditStudy'

const MainPanel = ({navStyle, currentUser, clearForm}) => (
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
                    {!!currentUser && (currentUser.role === ADMIN) && (
                        <NavItem style={navStyle}>
                            <Link to={ROUTES.VIEW_RESEARCHERS} > Researchers </Link>
                        </NavItem>
                    )}
                </Nav>
                {/* may use for filtering <ButtonToolbar className="mb-2 mb-md-0"></ButtonToolbar>*/}
            </div>
            <Switch>
                <Route path={ROUTES.VIEW_RESEARCHERS} render={() => (
                    <>
                        {clearForm()}
                        <ResearchersListContainer />
                    </>
                )} />
                <Route path={ROUTES.CREATE_STUDY} render={() => (
                    <>
                        {clearForm()}
                        <CreateStudy />
                    </>
                )} />
                <Route path={ROUTES.VIEW_STUDIES} render={() => (
                    <>
                        {clearForm()}
                        <StudiesListContainer />
                    </>
                )} />
                <Route path={ROUTES.PROFILE} render={() => (
                    <>
                        {clearForm()}
                        <Profile />
                    </>
                )} />  
                <Route path={ROUTES.EDIT_STUDY} render={() => (
                    <>
                        {clearForm()}
                        <EditStudy />
                    </>
                )} />  
                <Route render={() => (
                    <>
                        {clearForm()}
                        <StudiesListContainer />
                    </>
                )} />
            </Switch>
        </div>
    </main>
)

MainPanel.propTypes = {
    onClick: PropTypes.func.isRequired,
    studyInfo: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        studies: PropTypes.objectOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
                uid: PropTypes.string.isRequired,
                desc: PropTypes.string.isRequired
            })
        ).isRequired,
        selected: PropTypes.string
    }),
    currentUser: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    }),
    navStyle: PropTypes.object.isRequired
}

export default MainPanel