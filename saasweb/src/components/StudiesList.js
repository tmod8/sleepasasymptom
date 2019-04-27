import React from 'react'
import {
    ListGroup,
    Spinner,
    Card,
    CardTitle,
    CardText
} from 'reactstrap'
import Study from './Study'
import PropTypes from 'prop-types'
import {ADMIN} from '../constants/roles'

const StudiesList = ({onClick, calculateLifetime, fetchDataForExport, changeStatus, loading, studies, selected, currentUser, colorMap, participants}) => (
    <>
        {loading && <div>Loading...<Spinner color="secondary" /></div>}
        {!loading && Object.keys(studies).length===0 && 
            <Card className="text-center" body inverse color="warning">
                        <CardTitle><h2>No Studies</h2></CardTitle>
                        <CardText><h5>You currently have no studies.{currentUser.role===ADMIN && ' Click the "Create New Study" button to create a study.'}</h5></CardText>
            </Card>
        }
        {!loading && <ListGroup className="flex-column">
            {!!studies &&   Object.keys(studies).map((key) => 
                <>
                    <Study key={key} {...{studyInfo: {onClick, study: studies[key], selected, id: key, fetchDataForExport, changeStatus, colorMap, calculateLifetime, participants}}} />
                </>
            )}
        </ListGroup>}
    </>
)

StudiesList.propTypes = {
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    studies: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired
        })
    ).isRequired,
    selected: PropTypes.string.isRequired

}

export default StudiesList