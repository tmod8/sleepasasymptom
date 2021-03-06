import React from 'react'
import {
    ListGroup,
    Spinner,
    Button
} from 'reactstrap'
import PropTypes from 'prop-types'
import Researcher from './Researcher'
import InputEmailContainer from '../containers/InputEmailContainer'

const StudyResearchersList = ({removeResearcher, loading, researchers, owner, studyId}) => (
    <>
        {loading && <div>Loading...<Spinner color="secondary" /></div>}
        {!!owner && (
            <>
                <hr className="mb-4" />
                {'Add researcher to study'}
                <InputEmailContainer />
            </>
        )}
        <ListGroup className="flex-column">
            {!!researchers &&  (Object.keys(researchers).map(key =>
                <Researcher key={researchers[key].uid} {...{researcherInfo: {researcher: researchers[key], owner, removeResearcher, studyId}}} />
            ))}
        </ListGroup>
    </>
)

StudyResearchersList.propTypes = {
    loading: PropTypes.bool.isRequired,
    researchers: PropTypes.arrayOf(
        PropTypes.shape({
            uid: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired
        })
    ),
    owner: PropTypes.string.isRequired
    
}

export default StudyResearchersList 