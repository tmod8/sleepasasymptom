import React from 'react'
import {
    Button
} from 'reactstrap'

const CreateNewStudyButton = ({onClick}) => (
    <Button outline color="secondary" size="lg" onClick={() => {onClick()}}>Create New Study</Button>
)

export default CreateNewStudyButton