import {connect} from 'react-redux'
import CreateNewStudyButton from '../components/CreateNewStudyButton'
import {goToCreateStudy} from '../actions/redirectActions'
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(goToCreateStudy(ownProps))
        }
    }
}

const CreateNewStudy = connect(
    null,
    mapDispatchToProps
) (CreateNewStudyButton)

export default withRouter(CreateNewStudy)