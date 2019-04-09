import * as ROUTES from '../constants/routes'

export function goToStudiesList(ownProps) {
    return () => (
        ownProps.history.push(ROUTES.VIEW_STUDIES)
    )
}

export function goToCreateStudy(ownProps) {
    return () => {
        ownProps.history.push(ROUTES.CREATE_STUDY)
    }
}