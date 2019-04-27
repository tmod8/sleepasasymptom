import * as ACTION from '../constants/actionTypes'

export function setModal(value) {
    return {
        type: ACTION.SET_MODAL,
        value
    }
}

export function initializeEditStudy(info) {
    return {
        type: ACTION.INITIALIZE_EDIT_STUDY,
        studyName: info.studyName,
        description: info.description,
        constraints: info.constraints
    }
}

export function setConsent(url) {
    return {
        type: ACTION.SET_CONSENT,
        url
    }
}

export function selectDropdownItem(item) {
    return {
        type: ACTION.SELECT_DROPDOWN_ITEM,
        item
    }
}

export function unselectDropdownItem(constraint, value) {
    return {
        type: ACTION.UNSELECT_CONSTRAINT,
        constraint,
        value
    }
}

export function clearConstraint() {
    return {
        type: ACTION.CLEAR_CONSTRAINT
    }
}

export function editForm(info) {
    return {
        type: ACTION.EDIT,
        firstName: info.firstName,
        lastName: info.lastName,
        affiliation: info.affiliation,
        email: info.email
    }
}

export function setFormVal(field, value) {
    return {
        type: ACTION.SET,
        field, 
        value: !!value //ensures it is a boolean
    }
}

export function addAgeConstraint(min, max) {
    return {
        type: ACTION.ADD_AGE_CONSTRAINT,
        min,
        max
    }
}

export function addOtherConstraint(constraint, value) {
    return {
        type: ACTION.ADD_OTHER_CONSTRAINT,
        constraint,
        value
    }
}


export function clearForm() {
    return {
        type: ACTION.CLEAR_FORM
    }
}


/*
you can optionally add a second field to compare against value i.e. confirmPassword
*/
export function validate(field, value, comparison=undefined) {
    return {
        type: ACTION.VALIDATE,
        field,
        value,
        comparison
    }
}

export function formChange(field, value) {
    return {
        type: ACTION.FORM_CHANGE,
        field,
        value
    }
}