import React from 'react'
import {
    Button,
    UncontrolledButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap'
import PropTypes from 'prop-types'
import * as ROLES from '../constants/roles'
import InviteResearcherContainer from '../containers/InviteResearcherContainer'

const ResearcherActionBar = ({changeRole, currentUser, selectedUser, promotionRoles, demotionRoles}) => (
    <>
        {!!currentUser && currentUser.role===ROLES.ADMIN && (
            <>
                <hr className="mb-4" />
                <span className="d-flex align-items-center text-muted">
                    {'Invite a researcher to create an account'}
                </span>
                <InviteResearcherContainer />
            </>
        )}
        {!!currentUser && !!selectedUser.uid && (currentUser.role === ROLES.ADMIN) && (
            <>
                <hr className="mb-4" />
                <UncontrolledButtonDropdown className="m-1">
                    <DropdownToggle outline caret color="success">Promote</DropdownToggle>
                    <DropdownMenu>
                        {promotionRoles.map(role => (
                            <DropdownItem onClick={() => {changeRole(selectedUser.uid, role)}}>{role}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
                <UncontrolledButtonDropdown className="m-1">
                    <DropdownToggle outline caret color="danger">Demote</DropdownToggle>
                    <DropdownMenu>
                        {demotionRoles.map(role => (
                            <DropdownItem onClick={() => {changeRole(selectedUser.uid, role)}}>{role}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
                {/*<Button className="m-1" color="secondary" outline>Suspend</Button>*/}
            </>
        )} 
        
       
    </>
)

ResearcherActionBar.propTypes = {
    changeRole: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    selectedUser: PropTypes.object.isRequired
}

export default ResearcherActionBar