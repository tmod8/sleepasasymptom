import React from 'react'
import {
    Alert,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Button
} from 'reactstrap'

import PropTypes from 'prop-types'

const StudyForm = ({onClick, onSubmit, onChange, name, desc, error}) => (
    <Form onSubmit={ onSubmit() }>
                {error && <Alert color="danger">{ error.message }</Alert>}
                <FormGroup>
                    <Label for="nameId"></Label>
                    <Input type="text" name="name" id="nameId" value={ name } placeholder="Study name" onChange={ onChange() }/>
                    <FormFeedback>Please enter a valid name of at least two letters.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="descId"></Label>
                    <Input type="textarea" name="desc" id="descId" value={ desc } placeholder="Study description (optional)" onChange={ onChange() }/>
                </FormGroup>
                <Button color="secondary" outline onClick={ onClick() }>Cancel</Button>{' '}
                <Button color="dark">Create Study</Button>
            </Form>
)

StudyForm.propTypes = {
    onClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    error: PropTypes.object.isRequired
}

export default StudyForm