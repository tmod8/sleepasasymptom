import React from 'react'
import {
    ListGroup,
    Spinner,
    ListGroupItem,
    Badge
} from 'reactstrap'
import PropTypes from 'prop-types'
import {ADMIN} from '../constants/roles'

const ResearchersList = ({onClick, loading, researchers, selected, currentUser, colorMap}) => (
    <>
        {loading && <div>Loading...<Spinner color="secondary" /></div>}
        <ListGroup className="flex-column" >
            {!!researchers && !!currentUser && (currentUser.role === ADMIN) && Object.keys(researchers).map(key=> (
                currentUser.uid !== key && (
                    <ListGroupItem className="d-flex justify-content-between" active={key===selected ? true : false} tag="button" color="info" action onClick={() => {
                        onClick(key)
                    }}>
                        <span className="d-flex align-items-left flex-column">
                            <h5 className="mb-0">{researchers[key].firstName + ' ' + researchers[key].lastName}</h5>
                            <p className="mb-0">{researchers[key].affiliation}</p>
                            <p className="mb-0">{researchers[key].email}</p>
                        </span>
                        <Badge color={colorMap[researchers[key].role]}>{researchers[key].role}</Badge>
                    </ListGroupItem>
                )
            ))}
        </ListGroup>
    </>
)

ResearchersList.propTypes = {
    loading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    researchers: PropTypes.arrayOf(
        PropTypes.shape({
            uid: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            affiliation: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired
        })
    ),
    currentUser: PropTypes.object.isRequired
    
}

export default ResearchersList