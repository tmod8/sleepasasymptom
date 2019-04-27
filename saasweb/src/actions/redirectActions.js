import * as ROUTES from '../constants/routes'
import {clearForm} from './formActions'

export function goToStudiesList(ownProps) {
    return () => {
        clearForm()
        ownProps.history.push(ROUTES.VIEW_STUDIES)
    }
}

export function goToCreateStudy(ownProps) {
    return () => {
        clearForm()
        ownProps.history.push(ROUTES.CREATE_STUDY)
    }
}

export function goToEditStudy(ownProps) {
    return () => {
        clearForm()
        ownProps.history.push(ROUTES.EDIT_STUDY)
    }
}