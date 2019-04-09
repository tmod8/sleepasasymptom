import * as ACTION from '../constants/actionTypes'

export function selectDropdownItem(item) {
    console.log(item)
    return {
        type: ACTION.SELECT_DROPDOWN_ITEM,
        item
    }
}

export function clearConstraint() {
    return {
        type: ACTION.CLEAR_CONSTRAINT
    }
}

export function editForm() {
    return {
        type: ACTION.EDIT
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

export function initializeProfile(info) {
    return {
        type: ACTION.INITIALIZE_PROFILE,
        info
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