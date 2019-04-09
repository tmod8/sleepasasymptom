import * as ACTION from '../constants/actionTypes'
import {studiesRef} from '../firebase'
import {storageRef} from '../firebase'
import {addResearcher} from './researcherActions'
import {goToStudiesList} from './redirectActions'

//the user selects a study in the view study list
export function selectStudy(study) {
    return {
        type: ACTION.SELECT_STUDY,
        study
    }
}

//the user refreshes the list of studies
export function invalidateStudies() {
    return {
        type: ACTION.INVALIDATE_STUDIES
    }
}

//time to fetch researchers
function requestStudies() {
    return {
        type: ACTION.REQUEST_STUDIES
    }
}

//after async firebase request returns
function receiveStudies(json) {
    return {
        type: ACTION.RECEIVE_STUDIES,
        members: json
    }
}

function fetchStudies() {
    return dispatch => {
        dispatch(requestStudies())
        return studiesRef.once('value', snapshot => {
            dispatch(receiveStudies(snapshot.val()))
        })
    }
}

function shouldFetchStudies(state) {
    const studies = state.studies
    if (Object.keys(studies.members).length === 0 && studies.members.constructor === Object) {
        return true
    } else if (studies.isFetching) {
        return false
    } else {
        return studies.didInvalidate
    }
}

export function fetchStudiesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchStudies(getState())) {
            return dispatch(fetchStudies())
        } else {
            //let caller know there is nothing to wait for
            return Promise.resolve()
        }
    }
}

export function createStudy(studyInfo, date, uid, ownProps) {
    var studyId = studiesRef.push().key
    return dispatch => {
        studiesRef.child(studyId).set({
            studyName: studyInfo.studyName,
            description: studyInfo.description,
            date_created: date,
            status: "active",
            owner: uid,
            researchers: {
                [uid]: true
            },
            constraints: studyInfo.constraints
        })
        .then(() => {
            if (!!studyInfo.informedConsent) {
                console.log(studyInfo.informedConsent)
                storageRef.child('informedConsent/' + studyId).put(studyInfo.informedConsent)
                
            }
            dispatch(invalidateStudies())
            dispatch(fetchStudies())
            dispatch(goToStudiesList(ownProps))
        })
    }
}

export function addResearcherToStudy(studyId, researcher) {
    return dispatch => {
        studiesRef.child(studyId + "/researchers/" + researcher).set(true)
        .then(() => {
            dispatch(addResearcher(studyId, researcher))
        })
    }
}