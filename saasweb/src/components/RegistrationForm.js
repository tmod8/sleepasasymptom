import React from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Button,
    Alert
} from 'reactstrap'
import PropTypes from 'prop-types'

const RegistrationForm = ({onSubmit, onChange, validate, isInvalid, form, error, isValidLink}) => (
    <Container>
        <div className="py-5 text-center">
            <h1>
                Sleep As A Symptom
            </h1>
            <Row>
                <Col md={6} className="mx-auto">
                    <Form onSubmit={ e => {
                        e.preventDefault()
                        onSubmit(form.email, form.password, {userInfo: {email: form.email, firstName: form.firstName, lastName: form.lastName, affiliation: form.affiliation, role: "researcher"}})
                    }}>
                        {error && <Alert color="danger">{ error.message } </Alert>}
                        {!isValidLink && <Alert color="danger">{'You are not authorized to register for an account.'}</Alert>}
                        <FormGroup>
                            <Label for="firstNameId"></Label>
                            <Input invalid={isInvalid.firstName} type="text" name="firstName" id="firstNameId" value={form.firstName} placeholder="First name" onChange={e => {
                                onChange(e.target.name, e.target.value)
                                validate(e.target.name, e.target.value)
                            }} />
                            <FormFeedback invalid={ isInvalid.firstName }>Please enter your first name.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastNameId"></Label>
                            <Input invalid={isInvalid.lastName} type="text" name="lastName" id="lastNameId" value={form.lastName} placeholder="Last name" onChange={e => {
                                onChange(e.target.name, e.target.value)
                                validate(e.target.name, e.target.value)
                            }} />
                            <FormFeedback invalid={isInvalid.lastName}>Please enter your last name.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="emailId"></Label>
                            <Input invalid={isInvalid.email} type="email" name="email" id="emailId" value={form.email} placeholder="Email address" onChange={e => {
                                onChange(e.target.name, e.target.value)
                                validate(e.target.name, e.target.value)
                            }} />
                            <FormFeedback invalid={isInvalid.email}>Please enter a valid email.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="affiliationId"></Label>
                            <Input invalid={isInvalid.affiliation} type="text" name="affiliation" id="affiliationId" value={form.affiliation} placeholder="Affiliation" onChange={e => {
                                onChange(e.target.name, e.target.value)
                                validate(e.target.name, e.target.value)
                            }} />
                            <FormFeedback invalid={isInvalid.affiliation}>Please enter your work affiliation. It should be atleast 2 characters.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="passwordId"></Label>
                            <Input invalid={isInvalid.password} type="password" name="password" id="passwordId" value={form.password} placeholder="Password" onChange={e => {
                                onChange(e.target.name, e.target.value)
                                validate(e.target.name, e.target.value)
                            }} />
                            <FormFeedback invalid={isInvalid.password}>Please enter a valid password with at least one digit, lowercase letter, and uppercase letter.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPwId"></Label>
                            <Input invalid={isInvalid.confirmPassword} type="password" name="confirmPassword" id="confirmPwId" value={form.confirmPassword} placeholder="Confirm password" onChange={e => {
                                onChange(e.target.name, e.target.value)
                                validate(e.target.name, e.target.value, form.password)
                            }} />
                            <FormFeedback invalid={isInvalid.confirmPassword}>Passwords must match.</FormFeedback>
                        </FormGroup>
                        <Button disabled={ Object.keys(isInvalid).some(x => isInvalid[x]) && isValidLink} color="secondary" className="col-md-4 text-center">Register</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    </Container>
)

RegistrationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired, 
    onChange: PropTypes.func.isRequired, 
    validate: PropTypes.func.isRequired, 
    isInvalid: PropTypes.shape({
        email: PropTypes.bool.isRequired,
        firstName: PropTypes.bool.isRequired,
        lastName: PropTypes.bool.isRequired,
        affiliation: PropTypes.bool.isRequired,
        password: PropTypes.bool.isRequired,
        confirmPassword: PropTypes.bool.isRequired
    }).isRequired, 
    form: PropTypes.shape({
        email: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        affiliation: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string
    }).isRequired, 
    error: PropTypes.object
}

export default RegistrationForm