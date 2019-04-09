import {connect} from 'react-redux'
import ProfileForm from '../components/ProfileForm'
import {editForm, clearForm, formChange, initializeProfile} from '../actions/formActions'
import {editResearcherProfile} from '../actions/researcherActions'

const getCurrentUser = state => {
    return (
        state.researchers.members[state.auth.uid]===undefined ? 
             {}
        : 
           Object.assign({}, state.researchers.members[state.auth.uid], {uid: state.auth.uid})
    )
}

const mapStateToProps = state => {
    return {
        loading: state.researchers.isFetching,
        form: state.form,
        currentUser: getCurrentUser(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (uid, profile) => {
            dispatch(editResearcherProfile(uid, profile))
        },
        onEdit: () => {
            dispatch(editForm())
        },
        onCancel: () => {
            dispatch(clearForm())
        },
        onChange: (field, value) => {
            dispatch(formChange(field, value))
        },
        initialize: (info) => {
            dispatch(initializeProfile(info))
        }
    }
}

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
) (ProfileForm)

export default Profile