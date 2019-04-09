import * as ACTION from '../constants/actionTypes'
import {researcherRef} from '../firebase'
import * as ROUTES from '../constants/routes'
import {clearForm} from './formActions'
import {fetchStudiesIfNeeded} from './studyActions'

export function changeResearcherRole(researcher, role) {
    return dispatch => {
        researcherRef.child(researcher + '/role').set(role)
        .then(() => {
            dispatch(changeRole(researcher, role))
        })
    }
}

function changeRole(researcher, role) {
    return {
        type: ACTION.CHANGE_ROLE,
        researcher,
        role
    }
}

//the user selects a researcher in the view researcher list
export function selectResearcher(researcher) {
    return {
        type: ACTION.SELECT_RESEARCHER,
        researcher
    }
}

//the user refreshes the list of researchers
export function invalidateResearchers() {
    return {
        type: ACTION.INVALIDATE_RESEARCHERS
    }
}

//adds researcher to study
export function addResearcher(studyId, researcher) {
    return {
        type: ACTION.ADD_RESEARCHER_TO_STUDY,
        studyId,
        researcher
    }
}

//time to fetch researchers
function requestResearchers() {
    return {
        type: ACTION.REQUEST_RESEARCHERS
    }
}

//after async firebase request returns
function receiveResearchers(json) {
    return {
        type: ACTION.RECEIVE_RESEARCHERS,
        members: json
    }
}

function fetchResearchers() {
    return dispatch => {
        dispatch(requestResearchers())
        return researcherRef.once('value', snapshot => {
            dispatch(receiveResearchers(snapshot.val()))
        })
    }
}

function shouldFetchResearchers(state) {
    const researchers = state.researchers
    if (Object.keys(researchers.members).length === 0 && researchers.members.constructor === Object) {
        return true
    } else if (researchers.isFetching) {
        return false
    } else {
        return researchers.didInvalidate
    }
}

export function fetchResearchersIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchResearchers(getState())) {
            return dispatch(fetchResearchers())
        } else {
            //let caller know there is nothing to wait for
            return Promise.resolve()
        }
    }
}

export function createResearcher(userInfo, uid, ownProps) {
    return dispatch => {
        researcherRef.child(uid).set({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            affiliation: userInfo.affiliation,
            role: "researcher"
        })
        .then(() => {
            console.log('guten')
            dispatch(clearForm())
            dispatch(fetchResearchersIfNeeded())
            dispatch(fetchStudiesIfNeeded())
            ownProps.history.push(ROUTES.VIEW_STUDIES)
        })
    }

}

function editProfile(uid, profile) {
    return {
        type: ACTION.EDIT_PROFILE,
        uid,
        profile
    }
}

export function editResearcherProfile(uid, profile) {
    return dispatch => {
        researcherRef.child(uid).update({
            firstName: profile.firstName,
            lastName: profile.lastName,
            affiliation: profile.affiliation
        })
        .then(() => {
            dispatch(editProfile(uid, profile))
        })
    }
}