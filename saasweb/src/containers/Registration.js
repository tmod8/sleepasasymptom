import {connect} from 'react-redux'
import RegistrationForm from '../components/RegistrationForm'
import {validate, formChange} from '../actions/formActions'
import {register, isValidLink, hasAnAccount, redirectToLogin} from '../actions/authActions'
import { withRouter } from 'react-router-dom';



const mapStateToProps = state => {
    return {
        isInvalid: state.formVal,
        form: state.form,
        error: state.auth.error,
        isValidLink: isValidLink()
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        validate: (field, value, comparison=undefined) => {
            dispatch(validate(field, value, comparison))
        },
        onSubmit: (email, password, userInfo) => {
            dispatch(register(email, password, userInfo, ownProps))
            
        },
        onChange: (field, value) => {
            dispatch(formChange(field, value))
        }
    }
}

const Registration = connect(
    mapStateToProps,
    mapDispatchToProps
) (RegistrationForm)

export default withRouter(Registration)