import React from 'react'
import {
    Alert,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Button,
    Container,
    Row,
    Col
} from 'reactstrap'
import PropTypes from 'prop-types'
import {ToastsContainer, ToastsStore} from 'react-toasts'

const LoginForm = ({onSubmit, onChange, validate, isInvalid, form, error}) => {
    return (
        <Container>
        <div className="py-5 text-center">
            <ToastsContainer store={ToastsStore}/>
            <h1>
                Sleep As A Symptom
            </h1>   
            <Row>
                <Col md={6} className="mx-auto">
                    <Form onSubmit={ e => {
                        e.preventDefault()
                        onSubmit(form.email, form.password)
                    }}>
                        {!!error && <Alert color="danger">{ error.message }</Alert>}
                        <FormGroup>
                            <Label for="emailId"></Label>
                            <Input invalid={isInvalid.email} type="email" name="email" id="emailId" value={form.email} placeholder="Email address" onChange={ e => {
                                onChange(e.target.name, e.target.value)
                                validate(e.target.name, e.target.value)
                            }} />
                            <FormFeedback invalid={isInvalid.email}>Please enter a valid email.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="passwordId"></Label>
                            <Input invalid={isInvalid.password} type="password" name="password" id="passwordId" value={form.password} placeholder="Password" onChange={e => {
                                onChange(e.target.name, e.target.value)
                                validate(e.target.name, e.target.value)
                                }} />
                            <FormFeedback invalid={isInvalid.password}>Please enter a valid password with at least one digit, uppercase letter, and lowercase letter.</FormFeedback>
                        </FormGroup>
                        <Button color="secondary" className="col-md-4 text-center">Login</Button>
                    </Form>
                </Col>
            </Row>
        </div>
        </Container>
    )
 }

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    isInvalid: PropTypes.shape({
        email: PropTypes.bool.isRequired,
        password: PropTypes.bool.isRequired,
        firstName: PropTypes.bool,
        lastName: PropTypes.bool,
        affiliation: PropTypes.bool
    }).isRequired,
    form: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        affiliation: PropTypes.string
    }).isRequired,
    error: PropTypes.object
}

export default LoginForm