import {connect} from 'react-redux'
import ResearcherActionBar from '../components/ResearcherActionBar'
import {changeResearcherRole} from '../actions/researcherActions'
import * as ROLES from '../constants/roles'

const getCurrentUser = state => {
    return (
        state.researchers.members[state.auth.uid]===undefined ? 
            null 
        : 
            state.researchers.members[state.auth.uid]
    )
}

const getPromotionRoles = currentRole => {
    switch(currentRole) {
        case ROLES.ADMIN:
            return []
        case ROLES.SUPERVISOR:
            return [ROLES.ADMIN]
        case ROLES.RESEARCHER:
            return [ROLES.SUPERVISOR, ROLES.ADMIN]
        default:
            return []
    }
} 

const getDemotionRoles = currentRole => {
    switch(currentRole) {
        case ROLES.ADMIN:
            return [ROLES.SUPERVISOR, ROLES.RESEARCHER]
        case ROLES.SUPERVISOR:
            return [ROLES.RESEARCHER]
        case ROLES.RESEARCHER:
        default:
            return []
    }
}

const mapStateToProps = state => {
    return {
        currentUser: getCurrentUser(state),
        selectedUser: {
            uid: !!state.researchers.selected ? state.researchers.selected : '',
            role: !!state.researchers.selected && !!state.researchers.members ? state.researchers.members[state.researchers.selected].role : ''
        },
        promotionRoles: !!state.researchers.selected && !!state.researchers.members ? getPromotionRoles(state.researchers.members[state.researchers.selected].role) : [],
        demotionRoles: !!state.researchers.selected && !!state.researchers.members ? getDemotionRoles(state.researchers.members[state.researchers.selected].role) : []
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeRole: (researcher, role) => {
            dispatch(changeResearcherRole(researcher, role))
        }
    }
}

const ResearcherActionBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (ResearcherActionBar)

export default ResearcherActionBarContainer