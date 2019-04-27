import { combineReducers } from 'redux'
import * as ACTION from './constants/actionTypes'
import {initialState} from './store'
import {AGE} from './constants/constraints'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} )

function formVal(
    state = {
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        affiliation: false,
        studyName: false,
        description: false
    },
    action
) {
    switch(action.type) {
        case ACTION.VALIDATE:
            switch(action.field) {
                case "email":
                    return Object.assign({}, state, {
                        email: !(/^.+@[^\.].*\.[a-z]{2,}$/).test(action.value)
                    })
                case "password": 
                    return Object.assign({}, state, {
                        password: !(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).test(action.value) && action.value.length >= 8
                    })
                case "confirmPassword":
                    return Object.assign({}, state, {
                        confirmPassword: action.value != action.comparison
                    })
                case "firstName":
                    return Object.assign({}, state, {
                        firstName: action.value.length < 2
                    })
                case "lastName":
                    return Object.assign({}, state, {
                        lastName: action.value.length < 2
                    })
                case "affiliation":
                    return Object.assign({}, state, {
                        affiliation: action.value.length <= 1
                    })
                default:
                    return state
            }
        default:
            return state
    }
}

function form(
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        affiliation: '',
        studyName: '',
        description: '',
        confirmPassword: '',
        isEditing: false,
        constraints: {},
        selectedDropdown: '',
        minAge: 0,
        maxAge: 0,
        informedConsent: null,
        showModal: false,
        formUrl: null
    },
    action
) {
    switch(action.type) {
        case ACTION.INITIALIZE_EDIT_STUDY:
            return Object.assign({}, state, {
                studyName: action.studyName,
                description: action.description,
                constraints: action.constraints,
                isEditing: true
            })
        case ACTION.FORM_CHANGE:
            return Object.assign({}, state, {
                [action.field]: action.value
            })
        case ACTION.CLEAR_FORM:
            return Object.assign({}, state, {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                affiliation: '',
                studyName: '',
                description: '',
                confirmPassword: '',
                isEditing: false,
                constraints: {},
                selectedDropdown: '',
                minAge: 0,
                maxAge: 0,
                informedConsent: null,
                showModal: false,
                formUrl: null
            })
        case ACTION.EDIT:
            return Object.assign({}, state, {
                isEditing: true,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                affiliation: action.affiliation
            })
        case ACTION.SELECT_DROPDOWN_ITEM:
            return Object.assign({}, state, {
                selectedDropdown: action.item
            })
        case ACTION.ADD_OTHER_CONSTRAINT:
            return {
                ...state,
                constraints: {
                    ...state.constraints,
                    [action.constraint]: {
                        ...state.constraints[action.constraint],
                        [action.value]: true
                    }
                }
            }
        case ACTION.SET_CONSENT:
            return Object.assign({}, state, {
                formUrl: action.url
            })
        case ACTION.UNSELECT_CONSTRAINT:
           
            return {
                ...state,
                constraints: {
                    ...state.constraints,
                    [action.constraint]: Object.filter(state.constraints[action.constraint], constraint => constraint === action.value)
                }
            }
            
        case ACTION.ADD_AGE_CONSTRAINT:
            return {
                ...state,
                constraints: {
                    ...state.constraints,
                    age: {
                        min: action.min,
                        max: action.max
                    }
                }
            }
        case ACTION.CLEAR_CONSTRAINT:
            return Object.assign({}, state, {
                selectedDropdown: ''
            })
        case ACTION.SET_MODAL:
            return Object.assign({}, state, {
                showModal: action.value
            })
        default:
            return state
    }
}

function auth(
    state = {
        signedIn: false,
        error: null,
        uid: ''
    },
    action
) {
    switch(action.type) {
        case ACTION.SIGNIN_SUCCESS:
            return Object.assign({}, state, {
                signedIn: true,
                error: null,
                uid: action.auth.user.uid
            })
        case ACTION.AUTH_FAIL:
            return Object.assign({}, state, {
                signedIn: false,
                error: action.error,
                uid: ''
            })
        case ACTION.SIGNOUT_FAIL:
            return Object.assign({}, state, {
                signedIn: false,
                error: action.error,
                uid: ''
            })
        default:
            return state
    }
}



function researchers(
    state = {
        isFetching: false,
        didInvalidate: false,
        selected: '',
        error: null,
        members: {}
    }, 
    action
    ) {
        switch(action.type) {
            case ACTION.SELECT_RESEARCHER:
                return Object.assign({}, state, {
                    selected: action.researcher
                })
            case ACTION.INVALIDATE_RESEARCHERS:
                return Object.assign({}, state, {
                    didInvalidate: true,
                    selected: ''
                })
            case ACTION.REQUEST_RESEARCHERS:
                return Object.assign({}, state, {
                    isFetching: true,
                    didInvalidate: false,
                    selected: ''
                })
            case ACTION.RECEIVE_RESEARCHERS:
                return Object.assign({}, state, {
                    isFetching: false,
                    didInvalidate: false,
                    members: action.members,
                    selected: ''
                })
            case ACTION.CHANGE_ROLE:
                return {
                    ...state,
                    members: {
                        ...state.members,
                        [action.researcher]: {
                            ...state.members[action.researcher],
                            role: action.role
                        } 
                    }
                }
            case ACTION.EDIT_PROFILE:
                return {
                    ...state,
                    members: {
                        ...state.members,
                        [action.uid]: {
                            ...state.members[action.uid],
                            firstName: action.profile.firstName,
                            lastName: action.profile.lastName,
                            affiliation: action.profile.affiliation
                        }
                    }
                }
            default: 
                return state
        }
    }

    function healthData(
        state = {
            isFetching: false,
            didInvalidate: false,
            error: null,
            members: {}
        },
        action
    ) {
        switch(action.type) {
            case ACTION.INVALIDATE_HEALTH_DATA:
                return Object.assign({}, state, {
                    didInvalidate: true
                })
            case ACTION.REQUEST_HEALTH_DATA:
                return Object.assign({}, state, {
                    isFetching: true,
                    didInvalidate: false
                })
            case ACTION.RECEIVE_HEALTH_DATA:
                return Object.assign({}, state, {
                    isFetching: false,
                    didInvalidate: false,
                    members: action.members
                })
            default:
                return state
        }
    }

    function studies(
        state = {
            isFetching: false,
            didInvalidate: false,
            selected: '',
            error: null,
            members: {}
        }, 
        action
        ) {
            switch(action.type) {
                case ACTION.SELECT_STUDY:
                    return Object.assign({}, state, {
                        selected: action.study
                    })
                case ACTION.INVALIDATE_STUDIES:
                    return Object.assign({}, state, {
                        didInvalidate: true,
                        selected: ''
                    })
                case ACTION.REQUEST_STUDIES:
                    return Object.assign({}, state, {
                        isFetching: true,
                        didInvalidate: false,
                        selected: ''
                    })
                case ACTION.RECEIVE_STUDIES:
                    return Object.assign({}, state, {
                        isFetching: false,
                        didInvalidate: false,
                        members: action.members,
                        selected: ''
                    })
                case ACTION.CHANGE_STATUS:
                    return {
                        ...state,
                        members: {
                            ...state.members,
                            [action.study]: {
                                ...state.members[action.study],
                                status: action.status
                            } 
                        }
                    }
                case ACTION.ADD_RESEARCHER_TO_STUDY:
                    return {
                        ...state,
                        members: {
                            ...state.members,
                            [action.studyId]: {
                                ...state.members[action.studyId],
                                researchers: {
                                    ...state.members[action.studyId].researchers,
                                    [action.researcher]: true
                                }
                            }
                        }
                    }
                case ACTION.REMOVE_RESEARCHER_FROM_STUDY:
                    var filteredKeys = Object.keys(state.members[action.studyId].researchers).filter(key => key !== action.researcher)
                    var object = {}
                    filteredKeys.map(key => {
                        Object.assign(object, {[key]: true})
                    })
                    return {
                        ...state,
                        members: {
                            ...state.members,
                            [action.studyId]: {
                                ...state.members[action.studyId],
                                researchers: object
                            }
                        }
                    }
                default: 
                    return state
            }
        }
    
    

    const appReducer = combineReducers({
        auth,
        researchers,
        formVal,
        form,
        studies,
        healthData
    })

    const rootReducer = (state, action) => {
        if (action.type===ACTION.SIGNOUT_SUCCESS) {
            state = initialState
        }
        return appReducer(state, action)
    }
    
    export default rootReducer

