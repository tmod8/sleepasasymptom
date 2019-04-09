import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'
import {withRouter} from 'react-router-dom'
import {signIn} from '../actions/authActions'
import {formChange, validate} from '../actions/formActions'

const mapStateToProps = state => {
    
    return {
        form: state.form,
        isInvalid: state.formVal,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    
    return {
        onSubmit: (email, password) => {
            dispatch(signIn(email, password, ownProps))
        },
        onChange: (field, value) => {
            dispatch(formChange(field, value))
        },
        validate: (email, password) => {
            dispatch(validate(email, password))
        }
    }
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
) (LoginForm)

export default withRouter(Login)