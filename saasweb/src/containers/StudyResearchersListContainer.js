import {connect} from 'react-redux'
import {removeResearcherFromStudy} from '../actions/studyActions'
import StudyResearchersList from '../components/StudyResearchersList'

/*
Iterates through the list of researcher uids from a given study and returns a list of all corresponding researcher records
*/
const getResearchers = (members, ids) => {
    var researchers = []
    Object.keys(ids).map(id => {
        researchers.push({uid: id, email: members[id].email, firstName: members[id].firstName, lastName: members[id].lastName, role: members[id].role, affiliation: members[id].affiliation})
    })
    return researchers
}

const mapStateToProps = state => {
    return {
        loading: state.studies.isFetching,
        researchers: !!state.studies.members ?
                state.studies.members[state.studies.selected]!==undefined ?
                    getResearchers(state.researchers.members, state.studies.members[state.studies.selected].researchers) 
                : {}
            : {},
        owner: !!state.studies.members ?
                state.studies.members[state.studies.selected]!==undefined ?
                    state.studies.members[state.studies.selected].owner 
                : ''
            : '',
        studyId: !!state.studies.selected ? state.studies.selected : ''
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeResearcher: (studyId, researcher) => {
            dispatch(removeResearcherFromStudy(studyId, researcher))
        }
    }
}


const StudyResearchersListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (StudyResearchersList)

export default StudyResearchersListContainer