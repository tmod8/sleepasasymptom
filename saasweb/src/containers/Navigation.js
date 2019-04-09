import {connect} from 'react-redux'
import NavigationBar from '../components/NavigationBar'

const mapStateToProps = state => {
    return {
        signedIn: state.auth.signedIn
    }
}

const Navigation = connect(
    mapStateToProps,
    null
) (NavigationBar)

export default Navigation