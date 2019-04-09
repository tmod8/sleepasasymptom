import React from 'react'
import {
    ListGroup,
    Spinner
} from 'reactstrap'
import Researcher from './Researcher'
import * as ROLES from '../constants/roles'
import PropTypes from 'prop-types'

const AllResearchersList = ({currentUser, loading, researchers}) => (
    <>
        {loading && <div>Loading...<Spinner color="secondary" /></div>}
        <ListGroup className="flex-column">
            {(currentUser.role === ROLES.ADMIN) 
            && researchers.map(researcher => (auth.uid !== researcher.uid && 
                    <Researcher key={researcher.uid} {...researcher} />
            ))}
        </ListGroup>
    </>
)

AllResearchersList.propTypes ={
    currentUser: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    researchers: PropTypes.arrayOf(
        PropTypes.shape({
            uid: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
            affiliation: PropTypes.string.isRequired
        })
    )
}

export default AllResearchersList