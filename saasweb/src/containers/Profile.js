import {connect} from 'react-redux'
import ProfileForm from '../components/ProfileForm'
import {editForm, clearForm, formChange, validate} from '../actions/formActions'
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
        isInvalid: state.formVal,
        loading: state.researchers.isFetching,
        form: state.form,
        currentUser: getCurrentUser(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (uid, profile) => {
            dispatch(editResearcherProfile(uid, profile))
            dispatch(clearForm())
        },
        onEdit: (info) => {
            dispatch(editForm(info))
        },
        onCancel: () => {
            dispatch(clearForm())
        },
        onChange: (field, value) => {
            dispatch(formChange(field, value))
        },
        validate: (field, value, comparison=undefined) => {
            dispatch(validate(field, value, comparison))
        }
    }
}

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
) (ProfileForm)

export default Profile