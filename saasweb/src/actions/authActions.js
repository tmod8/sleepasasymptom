import * as ACTION from '../constants/actionTypes'
import {researcherRef, authRef, actionCodeSettings, EMAIL_LINK_SIGN_IN_METHOD, EMAIL_PASSWORD_SIGN_IN_METHOD} from '../firebase'
import {clearForm} from './formActions'
import {fetchStudiesIfNeeded} from './studyActions'
import {fetchResearchersIfNeeded, createResearcher, invalidateResearchers} from './researcherActions'
import * as ROUTES from '../constants/routes'
import {ToastsStore} from 'react-toasts'
import {RESEARCHER} from '../constants/roles'

export function isValidLink() {
    if (authRef.isSignInWithEmailLink(window.location.href)) {
        return true
    }
    return false
}

export function inviteResearcher(email) {
    return dispatch => {
        authRef.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            dispatch(clearForm())
        })
    }
}

export function redirectToLogin(ownProps) {
    return dispatch => {
        ToastsStore.error('You already have an account.')
        dispatch(clearForm())
        ownProps.history.push(ROUTES.LANDING)
    }
    
}

export function hasAnAccount(email) {
    return dispatch => {
        authRef.fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
            if (signInMethods.indexOf(
                EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
                    return true
                }
            if (signInMethods.indexOf(
               EMAIL_LINK_SIGN_IN_METHOD) !== -1) {
                return false
           }
           return false
       
        })
        .catch(error => {
            dispatch(authFail(error))
        })
    }
}

function signInSuccess(auth) {
    return {
        type: ACTION.SIGNIN_SUCCESS,
        auth: auth
    }
}

function authFail(error) {
    return {
        type: ACTION.AUTH_FAIL,
        error
    }
}

function signOutSuccess() {
    return {
        type: ACTION.SIGNOUT_SUCCESS
    }
}

function signOutFail(error) {
    return {
        type: ACTION.SIGNOUT_FAIL,
        error
    }
}

export function register(email, password, userInfo, ownProps) {
    return dispatch => {
        authRef
        .createUserWithEmailAndPassword(email, password)
        .then(auth => {
            researcherRef.child(auth.user.uid).set(Object.assign({},userInfo.userInfo))
            dispatch(signInSuccess(auth))
            dispatch(clearForm())
            dispatch(fetchResearchersIfNeeded())
            dispatch(fetchStudiesIfNeeded())
            ownProps.history.push(ROUTES.VIEW_STUDIES)
            
        })
        .catch(error => {
            dispatch(authFail(error))
        })
    }
}

export function signIn(email, password, ownProps) {
    return dispatch => {
        authRef
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            dispatch(signInSuccess(auth))
            dispatch(clearForm())
            dispatch(fetchResearchersIfNeeded())
            dispatch(fetchStudiesIfNeeded())
            ownProps.history.push(ROUTES.VIEW_STUDIES)
        })
        .catch(error => {
            dispatch(authFail(error))
        });
    }
}

export function signOut() {
    return dispatch => {
        authRef
        .signOut()
        .then(() =>{
            dispatch(signOutSuccess())
            dispatch(clearForm())
        })
        .catch(error => {
            dispatch(signOutFail(error))
        });
    }
}