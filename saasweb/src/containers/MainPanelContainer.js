import {connect} from 'react-redux'
import MainPanel from '../components/MainPanel'
import { withRouter } from 'react-router-dom';
import {clearForm} from '../actions/formActions'


var navStyle = { 
    padding: '15px', 
    display: 'inline-block', 
    lineHeight: '20px' 
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
        navStyle: navStyle,
        currentUser: getCurrentUser(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearForm: () => {
            dispatch(clearForm())
        }
    }
}



const MainPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (MainPanel)

export default withRouter(MainPanelContainer)
