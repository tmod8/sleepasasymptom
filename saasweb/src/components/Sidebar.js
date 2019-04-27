import React from 'react'
import {
    Col
} from 'reactstrap'
import { Route, Switch } from 'react-router-dom';
import StudyResearchersListContainer from '../containers/StudyResearchersListContainer'
import {VIEW_STUDIES, DASHBOARD, VIEW_RESEARCHERS, PROFILE} from '../constants/routes';
import * as ROLES from '../constants/roles';
import PropTypes from 'prop-types'
import ResearcherActionBarContainer from '../containers/ResearcherActionBarContainer'
import CreateNewStudy from '../containers/CreateNewStudy';
import StudyActionBarContainer from '../containers/StudyActionBarContainer'

const Sidebar = ({user}) => (
    <Col md={2} className="d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                
                <span className="d-flex align-items-left text-muted flex-column">
                    <h5 className="mb-0">{!!user && ('Hi ' + user.firstName)}</h5>
                    <p className="mb-0">{!!user && user.affiliation}</p>
                </span>
            </h6>
            <Route path={VIEW_STUDIES} component={StudyActionBarContainer} />
            <Switch>  
                <Route exact path={[VIEW_STUDIES, DASHBOARD]} component={StudyResearchersListContainer}/>
                <Route path={VIEW_RESEARCHERS} component={ResearcherActionBarContainer}/>
            </Switch>
            
            <hr className="mb-4" />
            {!!user && (user.role === ROLES.ADMIN || user.role === ROLES.SUPERVISOR) && (
                <Route exact path={[VIEW_STUDIES, DASHBOARD, VIEW_RESEARCHERS, PROFILE]} component={CreateNewStudy} />
            )}

        </div>
    </Col>
)

Sidebar.propTypes = {
    onClick: PropTypes.func.isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        affiliation: PropTypes.string.isRequired
    })
}

export default Sidebar