import {connect} from 'react-redux'
import EditStudyForm from '../components/EditStudyForm'
import {clearForm, formChange, initializeEditStudy, addOtherConstraint, addAgeConstraint, selectDropdownItem, clearConstraint, unselectDropdownItem} from '../actions/formActions'
import { withRouter } from 'react-router-dom';
import {goToStudiesList} from '../actions/redirectActions'
import {getInformedConsent} from '../actions/fileActions'
import {editStudy} from '../actions/studyActions'
import * as CONSTRAINTS from '../constants/constraints'

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
        study: !!state.studies.members ?
            state.studies.members[state.studies.selected]!==undefined ? state.studies.members[state.studies.selected] : {}
        :
            {},
        informedConsent: !!state.studies.selected ? getInformedConsent(state.studies.selected) : null,
        constraintOptions: constraintOptions(state.form.constraints),
        selectedStudy: !!state.studies.selected ? state.studies.selected : '',
        style,
        error: state.studies.error
    

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (field, value) => {
            dispatch(formChange(field, value))
        },
        onEdit: (info) => {
            dispatch(initializeEditStudy(info))
        },
        onCancel: () => {
            dispatch(clearForm())
            dispatch(goToStudiesList(ownProps))
        },
        onSubmit: (info) => {
            dispatch(editStudy(info, ownProps))
            dispatch(clearForm())
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
        },
        deleteConstraint: (constraint, value) => {
            dispatch(unselectDropdownItem(constraint, value))
        }

    }
}

const EditStudy = connect(
    mapStateToProps,
    mapDispatchToProps
) (EditStudyForm)

export default withRouter(EditStudy)