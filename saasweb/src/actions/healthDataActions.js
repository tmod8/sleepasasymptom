import {healthDataRef} from '../firebase'
import * as ACTION from '../constants/actionTypes'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} )

export function invalidateData() {
    return {
        type: ACTION.INVALIDATE_HEALTH_DATA
    }
}

//time to fetch researchers
function requestData() {
    return {
        type: ACTION.REQUEST_HEALTH_DATA
    }
}

//after async firebase request returns
function receiveData(json) {
    return {
        type: ACTION.RECEIVE_HEALTH_DATA,
        members: json
    }
}

export function fetchData(users) {
    return dispatch => {
        dispatch(requestData())
        healthDataRef.once('value', snapshot => {
            var filtered = {}
            var snap = snapshot.val()
            Object.keys(snap).map(key => {
                if (Object.keys(users).includes(key)) {
                    Object.assign(filtered, {[key]: snap[key]})
                }
            })
            dispatch(receiveData(filtered))
        })  
    }
}

function shouldFetchData(state) {
    const data = state.healthData
    if (Object.keys(data.members).length === 0 && data.members.constructor === Object) {
        return true
    } else if (data.isFetching) {
        return false
    } else {
        return data.didInvalidate
    }
}

export function fetchDataIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchData(getState())) {
            return dispatch(fetchData())
        } else {
            //let caller know there is nothing to wait for
            return Promise.resolve()
        }
    }
}