import {connect} from 'react-redux'
import RefreshButton from '../components/RefreshButton'
import {invalidateResearchers, fetchResearchersIfNeeded} from '../actions/researcherActions'
import {invalidateStudies, fetchStudiesIfNeeded} from '../actions/studyActions'

const mapDispatchToProps = dispatch => {
    return {
        refresh: () => {
            dispatch(invalidateResearchers())
            dispatch(invalidateStudies())
            dispatch(fetchResearchersIfNeeded())
            dispatch(fetchStudiesIfNeeded())
        }
    }
}

const Refresh = connect(
    null,
    mapDispatchToProps
) (RefreshButton)

export default Refresh