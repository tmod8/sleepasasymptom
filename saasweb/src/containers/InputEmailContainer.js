import {connect} from 'react-redux'
import InputEmail from '../components/InputEmail'
import {formChange, setModal, clearForm} from '../actions/formActions'
import {addResearcherToStudy} from '../actions/studyActions'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} )

const doesEmailExist = (researchers, email) => {
    var researcher = Object.filter(researchers, r => (r.email===email))
    return Object.keys(researcher).length === 0 && researcher.constructor === Object
}

const getResearcher = (email, researchers) => {
    var researcher = Object.filter(researchers, r => (r.email===email))
    return Object.keys(researcher).pop()
}

const mapStateToProps = state => {
    return {
        email: state.form.email,
        error: state.studies.error,
        emailNotExist: doesEmailExist(state.researchers.members, state.form.email),
        researchers: state.researchers.members,
        study: !!state.studies.selected ? state.studies.selected : '',
        showModal: state.form.showModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (studyId, email, researchers) => {
            dispatch(addResearcherToStudy(studyId, getResearcher(email, researchers)))
        },
        onChange: (field, value, researchers) => {
            dispatch(formChange(field, value))
        },
        setModal: (value) => {
            dispatch(setModal(value))
        },
        clearForm: () => {
            dispatch(clearForm())
        }
    }
}

const InputEmailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (InputEmail)

export default InputEmailContainer