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
    Spinner,

} from 'reactstrap'

const ProfileForm = ({onSubmit, onEdit, onCancel, onChange, initialize, loading, form, currentUser}) => (
    <>
        <Container>
            <div className="py-5 text-center">
                <Row>
                    <Col lg={6} >
                    <h2 className="d-flex justify-content-between mt-1 mb-5 text-muted">
                    <span>Profile</span>
                    <div className="d-flex align-items-center text-muted" >
                        <Button outline color="secondary" className="fa fa-edit" onClick={() => {
                            initialize({info: {email: currentUser.email, firstName: currentUser.firstName, lastName: currentUser.lastName, affiliation: currentUser.affiliation}})
                            onEdit()
                            }}>{' '} Edit</Button>
                    </div>
                </h2>
                {loading && <div>Loading...<Spinner color="secondary" /></div>}
                {!!currentUser && (
                    <Form onSubmit={e => {
                        e.preventDefault()
                        onSubmit(currentUser.uid, {profile: {firstName: form.firstName, lastName: form.lastName, email: form.email, affiliation: form.affiliation}})
                    }}>
                        <FormGroup row>
                            <Label for="firstNameId" className="lead">First Name</Label>
                            <Input plaintext={ !form.isEditing } type="text" name="firstName" id="firstNameId" value={ form.isEditing ? form.firstName : currentUser.firstName } onChange={e => {
                                onChange(e.target.name, e.target.value)
                            }} />
                            <FormFeedback>Please enter a valid name of at least two letters.</FormFeedback>  
                        </FormGroup>
                        
                        <FormGroup row>
                            <Label for="lastNameId" className="lead">Last Name</Label>
                            <Input plaintext={ !form.isEditing } type="text" name="lastName" id="lastNameId" value={ form.isEditing ? form.lastName : currentUser.lastName} onChange={e => {
                                onChange(e.target.name, e.target.value)
                            }} />
                            <FormFeedback>Please enter a valid name of at least two letters</FormFeedback>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="emailId" className="lead">Email</Label>
                            <Input plaintext={true} type="email" name="email" id="emailId" value={ form.isEditing ? form.email : currentUser.email} />
                        </FormGroup>
                        <FormGroup row>
                            <Label for="affiliationId" className="lead">Affiliation</Label>
                            <Input plaintext={ !form.isEditing } type="affiliation" name="affiliation" id="affiliationId" value={ form.isEditing ? form.affiliation : currentUser.affiliation} onChange={e => {
                                onChange(e.target.name, e.target.value)
                            }} />
                            <FormFeedback>Please enter a valid affiliation.</FormFeedback>
                        </FormGroup>
                        <Button color="secondary" outline onClick={() => {
                            onCancel()
                        }}>Cancel</Button>{' '}
                        <Button disabled={ !form.isEditing } color="dark" outline>Apply</Button>
                    </Form>
                )}
                    </Col>
                </Row>
            </div>
        </Container>
    </>
)

export default ProfileForm