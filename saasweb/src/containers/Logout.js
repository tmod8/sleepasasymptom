import {connect} from 'react-redux'
import LogoutButton from '../components/LogoutButton'
import {signOut} from '../actions/authActions'

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => {
            dispatch(signOut())
        }
    }
}

const Logout = connect(
    null,
    mapDispatchToProps
) (LogoutButton)

export default Logout