import {connect} from 'react-redux'
import {formChange, setModal, clearForm, validate} from '../actions/formActions'
import {inviteResearcher} from '../actions/authActions'
import InviteResearcher from '../components/InviteResearcher';

const exist = (researchers, email) => {
    var researcher = Object.filter(researchers, r => (r.email===email))
    return !(Object.keys(researcher).length === 0 && researcher.constructor === Object) || email===''
} 

const mapStateToProps = state => {
    return {
        email: state.form.email,
        error: state.auth.error,
        researcherExists: exist(state.researchers.members, state.form.email),
        researchers: state.researchers.members,
        showModal: state.form.showModal,
        isInvalid: state.formVal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (email) => {
            dispatch(inviteResearcher(email))
        },
        onChange: (field, value, researchers) => {
           dispatch(formChange(field, value))
           //exist(researchers, value)
        },
        setModal: (value) => {
            dispatch(setModal(value))
        },
        clearForm: () => {
            dispatch(clearForm())
        },
        validate: (field, value) => {
            dispatch(validate(field, value))
        }
    }
}

const InviteResearcherContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (InviteResearcher)

export default InviteResearcherContainer