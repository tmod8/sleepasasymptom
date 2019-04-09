import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        signedIn: state.auth.signedIn
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    null
) (Dashboard)



export default withRouter(DashboardContainer)