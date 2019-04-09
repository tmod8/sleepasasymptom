import {connect} from 'react-redux'
import StudiesList from '../components/StudiesList'
import * as ROLES from '../constants/roles'
import {selectStudy} from '../actions/studyActions'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} )

const filterStudies = (studies, role, user) => {
    switch(role) {
        case ROLES.RESEARCHER:
        case ROLES.SUPERVISOR:
            return Object.filter(studies, s => (s.researchers[user]))
        case ROLES.ADMIN:
        default:
            return studies

    }
}

const getCurrentUser = state => {
    return (
        state.researchers.members[state.auth.uid]===undefined ? 
            null 
        : 
            state.researchers.members[state.auth.uid]
    )
}

const mapStateToProps = state => {
    return {
        loading: state.studies.isFetching,
        studies: getCurrentUser(state)===null ?
            null
        :
            state.studies.members.length===0 ? null : filterStudies(state.studies.members, getCurrentUser(state).role, state.auth.uid),
        selected: state.studies.selected===undefined ? '' : state.studies.selected,
        currentUser: getCurrentUser(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: (study) => {
            dispatch(selectStudy(study))
        }
    }
}

const StudiesListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (StudiesList)

export default StudiesListContainer