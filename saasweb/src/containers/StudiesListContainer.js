import {connect} from 'react-redux'
import StudiesList from '../components/StudiesList'
import * as ROLES from '../constants/roles'
import {selectStudy, changeStatus} from '../actions/studyActions'
import {fetchData} from '../actions/healthDataActions'

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

const _MS_PER_DAY = 1000 * 60 * 60 * 24
const calculateLifetime = (date) => {
    var str = date.split(" ")
    var newDate = new Date(str[1])
    var dateUtc = Date.UTC(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate())
    var today = new Date();
    var todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    var diff = (todayUTC - dateUtc) / _MS_PER_DAY
    return diff
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
        currentUser: getCurrentUser(state),
        colorMap: {
            inactive: "info",
            active: "success",
            suspended: "warning",
            terminated: "danger",
            concluded: "secondary"
        },
        participants: !!state.studies.selected ? state.studies.members[state.studies.selected].participants : {}
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: (study) => {
            dispatch(selectStudy(study))
        },
        calculateLifetime: (date) => {
            return calculateLifetime(date)
        },
        fetchDataForExport: (users) => {
            dispatch(fetchData(users))
        },
        changeStatus: (study, status) => {
            dispatch(changeStatus(study, status))
        }
    }
}

const StudiesListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (StudiesList)

export default StudiesListContainer