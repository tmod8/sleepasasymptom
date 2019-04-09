import React from 'react'
import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Badge
} from 'reactstrap'
import * as STATUS from '../constants/status'
import PropTypes from 'prop-types'

const Study = ({studyInfo}) => (
    <ListGroupItem active={studyInfo.id === studyInfo.selected ? true : false} tag="button" color="info" action onClick={() => {
            studyInfo.onClick(studyInfo.id)
        }}>
        <ListGroupItemHeading>
            { studyInfo.study.studyName + ' ' }
            <Badge pill color={ studyInfo.study.status===STATUS.ACTIVE ? "success" : "danger" }>{ studyInfo.study.status }</Badge>
        </ListGroupItemHeading>
        <ListGroupItemText>{ studyInfo.study.description }</ListGroupItemText>
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