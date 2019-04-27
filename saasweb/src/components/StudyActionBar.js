import React from 'react'
import {
    Button,
    Spinner,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import * as ROLES from '../constants/roles'

const StudyActionBar = ({onExport, onEdit, loading, currentUser, changeStatus, selectedStudy, healthData, studyName, participants, statuses, fileOptions}) => (
    <>
        {loading && <div>Loading...<Spinner color="secondary" /></div>}
        {!!currentUser && !!selectedStudy && !loading && 
            <>
                <hr className="mb-4" />
                {!!participants && !participants.length &&
                    <UncontrolledButtonDropdown className="m-1">
                        <DropdownToggle outline caret color="success">Export</DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(fileOptions).map(type => (
                                <DropdownItem onClick={() => {onExport(participants, healthData, studyName, fileOptions[type])}}>{fileOptions[type]}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                }
                <Button className="m-1" outline color="warning" onClick={() => {
                    onEdit()
                }}>Edit</Button>
                {currentUser.role===ROLES.ADMIN && 
                    <UncontrolledButtonDropdown className="m-1">
                        <DropdownToggle outline caret color="info">Change Status</DropdownToggle>
                        <DropdownMenu>
                            {statuses.map(status => (
                                <DropdownItem onClick={() => {changeStatus(selectedStudy, status)}}>{status}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                }
            </>
        }
    </>
)


export default StudyActionBar