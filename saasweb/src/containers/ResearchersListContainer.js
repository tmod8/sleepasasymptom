import {connect} from 'react-redux'
import ResearchersList from '../components/ResearchersList'
import {selectResearcher} from '../actions/researcherActions'

const getCurrentUser = state => {
    return (
        state.researchers.members[state.auth.uid]===undefined ? 
            null 
        : 
           Object.assign({}, state.researchers.members[state.auth.uid], {uid: state.auth.uid})
    )
}

const mapStateToProps = state => {
    return {
        loading: state.researchers.isFetching,
        researchers: state.researchers.members,
        selected: state.researchers.selected===undefined? '' : state.researchers.selected,
        currentUser: getCurrentUser(state),
        colorMap: {
            admin: "danger",
            supervisor: "warning",
            researcher: "success"
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: (researcher) => {
            dispatch(selectResearcher(researcher))
        }
    }
}

const ResearchersListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (ResearchersList)

export default ResearchersListContainer