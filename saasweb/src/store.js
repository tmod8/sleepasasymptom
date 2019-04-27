import { createStore, applyMiddleware} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import reducers from './reducers'



export const initialState = {
    formVal: {
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        affiliation: false,
        studyName: false,
        description: false
    },
    form: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        affiliation: '',
        studyName: '',
        description: '',
        isEditing: false,
        constraints: {},
        selectedDropdown: '',
        minAge: 0,
        maxAge: 0,
        informedConsent: null,
        formUrl: null,
        showModal: false
    },
    auth: {
        signedIn: false,
        error: null,
        uid: ''
    },
    researchers: {
        isFetching: false,
        didInvalidate: false,
        selected: '',
        error: null,
        members: {}
    },
    studies: {
        isFetching: false,
        didInvalidate: false,
        selected: '',
        error: null,
        members: {}
    },
    healthData: {
        isFetching: false,
        didInvalidate: false,
        error: null,
        members: {}
    }
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'studies', 'researchers']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default function configureStore(state = initialState) {
    return createStore(
        persistedReducer,
        state,
        applyMiddleware(thunk) 
    );
}