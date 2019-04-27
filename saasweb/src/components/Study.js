import React from 'react'
import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Badge,
    Card,
    CardTitle,
    CardText
} from 'reactstrap'
import PropTypes from 'prop-types'
import * as STATUS from '../constants/status'

const Study = ({studyInfo}) => (
    <ListGroupItem  active={studyInfo.id === studyInfo.selected ? true : false} tag="button" color="info" action onClick={() => {
            studyInfo.onClick(studyInfo.id)
            if (!!studyInfo.study.participants) {
                studyInfo.fetchDataForExport(studyInfo.study.participants)
            }
            if (studyInfo.calculateLifetime(studyInfo.study.dateCreated) > 60) {
                studyInfo.changeStatus(studyInfo.id, STATUS.INACTIVE)
            }
        }}>
            <span className="d-flex align-items-left flex-column">
                <h5 className="mb-0">
                    <span className="mr-1">{studyInfo.study.studyName }</span>
                    <Badge pill color={ studyInfo.colorMap[studyInfo.study.status] }>{ studyInfo.study.status }</Badge> 
                    <Badge color="light" className="float-right ml-5">{'Lifetime: ' + studyInfo.calculateLifetime(studyInfo.study.dateCreated) + ' days'}</Badge>
                    <Badge color="light" className="float-right ml-5">{'Participants: ' + (!!studyInfo.study.participants ? Object.keys(studyInfo.study.participants).length : 0)}</Badge>
                </h5>
                <p className="mb-0">{studyInfo.study.description}</p>
            </span>
    </ListGroupItem>
)

Study.propTypes = {
    studyInfo: PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        study: PropTypes.shape({
            name: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired
        }).isRequired,
        selected: PropTypes.string.isRequired
    })
}

export default Study