import React from 'react'
import {
    ListGroupItem,
    Badge,
    Button
} from 'reactstrap'
import PropTypes from 'prop-types'

const Researcher = ({researcherInfo}) => (
    <ListGroupItem>
        <span className="d-flex flex-column" >
            <h5 className="mb-0">
                {researcherInfo.researcher.firstName + ' ' + researcherInfo.researcher.lastName} 
                {researcherInfo.researcher.uid !== researcherInfo.owner && <Button close onClick={() => {researcherInfo.removeResearcher(researcherInfo.studyId, researcherInfo.researcher.uid)}}/>}
            </h5>
            <p className="mb-0">{researcherInfo.researcher.affiliation}</p>
        </span>
        {!!researcherInfo.owner && (researcherInfo.owner === researcherInfo.researcher.uid) ? <Badge pill color="warning">owner</Badge>: null}
    </ListGroupItem>
)

Researcher.propTypes = {
    researcherInfo: PropTypes.shape({
        researcher: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            affiliation: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired
        }).isRequired,
        owner: PropTypes.string
    }).isRequired
}

export default Researcher