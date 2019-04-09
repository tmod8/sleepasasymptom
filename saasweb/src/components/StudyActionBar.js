import React from 'react'
import {
    Button
} from 'reactstrap'
import * as STATUS from '../constants/status'
import * as ROLES from '../constants/roles'
import PropTypes from 'prop-types'

const StudyActionBar = ({archiveStudy, currentUser}) => (
    <>
        {!!currentUser && !!study && (currentUser.role === ROLES.ADMIN && study.status===STATUS.ACTIVE) && (
            <Button color="danger" onClick={archiveStudy}>archive</Button>
        )} {' '}
        <Button  color="info">info</Button>{' '}
        {!!currentUser && 
            <Button disabled={currentUser.status === STATUS.ARCHIVED} color="success">Export</Button>
        }
    </>
)

StudyActionBar.propTypes ={

}

export default StudyActionBar