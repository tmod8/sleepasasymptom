import {connect} from 'react-redux'
import StudyActionBar from '../components/StudyActionBar'
import {download, json2xml} from '../actions/fileActions'
import {changeStatus} from '../actions/studyActions'
import * as STATUS from '../constants/status'
import * as FILE from '../constants/fileTypes'
import {goToEditStudy} from '../actions/redirectActions'
import { withRouter } from 'react-router-dom';

const getStatuses = currentStatus => {
    switch(currentStatus) {
        case STATUS.INACTIVE:
            return [STATUS.ACTIVE, STATUS.CONCLUDED, STATUS.TERMINATED, STATUS.SUSPENDED]
        case STATUS.ACTIVE:
            return [STATUS.INACTIVE, STATUS.CONCLUDED, STATUS.TERMINATED, STATUS.SUSPENDED]
        case STATUS.CONCLUDED:
            return [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.TERMINATED, STATUS.SUSPENDED]
        case STATUS.TERMINATED:
            return [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.CONCLUDED, STATUS.SUSPENDED]
        case STATUS.SUSPENDED:
            return [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.TERMINATED, STATUS.CONCLUDED]
        default:
            return []
    }
}



const getJSON = (participants, healthData) => {
    var json = {}
    Object.keys(participants).map(key => {
        if (Object.keys(healthData).includes(key)) {
            Object.assign(json, {[key]: healthData[key]})
        }
    })
    return json
}

const exportDataJSON = (json, studyName) => {
    download(JSON.stringify(json), studyName, "application/json")
} 

const exportDataXML = (json, studyName) => {
    var xml = json2xml(json)
    download(xml, studyName, "text/xml")
}

const getCurrentUser = state => {
    return (
        state.researchers.members[state.auth.uid]===undefined ? 
            null 
        : 
            state.researchers.members[state.auth.uid]
    )
}

const functionMap = {
    json: exportDataJSON,
    xml: exportDataXML

}

const mapStateToProps = state => {
    return {
        currentUser: getCurrentUser(state),
        selectedStudy: !!state.studies.selected ? state.studies.selected : '',
        loading: state.healthData.isFetching,
        studyName: !!state.studies.selected ? state.studies.members[state.studies.selected].studyName : '',
        healthData: !!state.healthData.members ? state.healthData.members : {},
        participants: !!state.studies.selected ? state.studies.members[state.studies.selected].participants : {},
        statuses: !!state.studies.selected && !!state.studies.members ? getStatuses(state.studies.members[state.studies.selected].status) : [],
        fileOptions: FILE.OPTIONS
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onExport: (participants, healthData, studyName, fileType) => {
            functionMap[fileType](getJSON(participants, healthData), studyName)
        },
        changeStatus: (study, status) => {
            dispatch(changeStatus(study, status))
        },
        onEdit: () => {
            dispatch(goToEditStudy(ownProps))
        }
    }
}

const StudyActionBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (StudyActionBar)

export default withRouter(StudyActionBarContainer)