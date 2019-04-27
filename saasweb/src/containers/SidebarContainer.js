import {connect} from 'react-redux'
import Sidebar from '../components/Sidebar'
import { withRouter } from 'react-router-dom';

/*
*loading holds the bool for the spinner
*researchers is first checking to see if a study has been selected from the list
*then it checks to see if the study id given is a real study
*it will return the list of researchers in the study if there exists an correct id
*the owner field checks for the same things as the researchers field
*user is the record for the signed in user
*/
const mapStateToProps = state => {
    return {
        user: !!state.researchers.members ? state.researchers.members[state.auth.uid] : {}
        
    }
}

const SidebarContainer = connect(
    mapStateToProps,
    null
) (Sidebar)

export default withRouter(SidebarContainer)