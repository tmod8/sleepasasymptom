import {connect} from 'react-redux'
import CreateStudyForm from '../components/CreateStudyForm'
import {goToStudiesList} from '../actions/redirectActions'
import {formChange, selectDropdownItem, addAgeConstraint, addOtherConstraint, clearConstraint, clearForm} from '../actions/formActions'
import {createStudy} from '../actions/studyActions'
import { withRouter } from 'react-router-dom';
import * as CONSTRAINTS from '../constants/constraints'

const getDate = () => {
    let date = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getUTCDay()] + ' ' +  date.getUTCMonth() + '/' + date.getUTCDate() + '/' + date.getUTCFullYear() 
        + ' ' +  date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds() + ' UTC';
}

const style = {
    listStyleType: "none"
}


const constraintOptions = constraints => {
    if (!!constraints[CONSTRAINTS.OPTIONS.AGE]) {
        return {[CONSTRAINTS.OPTIONS.RACE]: CONSTRAINTS.RACE, [CONSTRAINTS.OPTIONS.GENDER]: CONSTRAINTS.GENDER}
    }
    return {[CONSTRAINTS.OPTIONS.AGE]: CONSTRAINTS.AGE, [CONSTRAINTS.OPTIONS.GENDER]: CONSTRAINTS.GENDER, [CONSTRAINTS.OPTIONS.RACE]: CONSTRAINTS.RACE}
}
 
const mapStateToProps = state => {
    return {
        form: state.form,
        error: state.auth.error,
        uid: state.auth.uid,
        constraintOptions: constraintOptions(state.form.constraints),
        style
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(goToStudiesList(ownProps))
            dispatch(clearForm())
        },
        onChange: (field, value) => {
            dispatch(formChange(field, value))
        },
        onSubmit: (studyInfo, uid) => {
            dispatch(createStudy(studyInfo, getDate(), uid, ownProps))
        },
        selectDropdown: (item) => {
            dispatch(selectDropdownItem(item))
        },
        addAgeConstraint: (min, max) => {
            dispatch(addAgeConstraint(min, max))
            dispatch(clearConstraint())
        },
        addOtherConstraint: (constraint, value) => {
            dispatch(addOtherConstraint(constraint, value))
            dispatch(clearConstraint())
        }
    }
}

const CreateStudy = connect(
    mapStateToProps,
    mapDispatchToProps
) (CreateStudyForm)

export default withRouter(CreateStudy)