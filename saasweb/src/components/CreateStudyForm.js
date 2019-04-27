import React from 'react'
import {
    Form,
    Alert,
    FormGroup,
    Input,
    FormFeedback,
    Label,
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Container
} from 'reactstrap'
import PropTypes from 'prop-types'
import {OPTIONS} from '../constants/constraints'

const CreateStudyForm = ({onSubmit, onChange, onClick, selectDropdown, addAgeConstraint, addOtherConstraint, deleteConstraint, form, error, uid, constraintOptions, style}) => (
    <Container>
    <div className="py-3">
        <Row>
            <Col lg={10} >
                <h2 className="d-flex justify-content-between mb-3 text-muted">
                    <span>Create a Study</span>
                </h2>
   
                <Form onSubmit={e => {
                            e.preventDefault()
                            onSubmit({studyName: form.studyName, description: form.description, constraints: form.constraints, informedConsent: form.informedConsent}, uid)
                        }}>
                        {error && <Alert color="danger">{ error.message }</Alert>}
                        <FormGroup>
                            <Label for="nameId"></Label>
                            <Input type="text" name="studyName" id="nameId" value={ form.studyName } placeholder="Study name" onChange={e => {
                                onChange(e.target.name, e.target.value)
                            }}/>
                            <FormFeedback>Please enter a valid name of at least two letters.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="descId"></Label>
                            <Input type="textarea" name="description" id="descId" value={ form.description } placeholder="Study description (optional)" onChange={e => {
                                onChange(e.target.name, e.target.value)
                            }}/>
                        </FormGroup>

                        <ListGroup>
                        {!!form.constraints  && Object.keys(form.constraints).map(constraint => (
                            
                            Object.keys(form.constraints[constraint]).length > 0 && (<ListGroupItem>
                                {console.log(form.constraints)}
                                
                                {constraint + ': '}
                                <Button onClick={() => {
                                    deleteConstraint(constraint, form.constraints[constraint])
                                }} close/>
                                <ul style={style}>
                                    {Object.keys(form.constraints[constraint]).map(item => (
                                        
                                        <li>{(form.constraints[constraint][item]===true || form.constraints[constraint][item]===false) ? item : item + ': ' + form.constraints[constraint][item]}
                                        
                                        </li>
                                    ))}
                                </ul>
                            </ListGroupItem>)
                        ))}
                        </ListGroup>
                        <UncontrolledButtonDropdown className="m-2">
                            <DropdownToggle caret outline color="danger">Constraints</DropdownToggle>
                            <DropdownMenu>
                                {Object.keys(constraintOptions).map(constraint => (
                                        <DropdownItem onClick={() => {selectDropdown(constraint)}}>
                                            {constraint}
                                        </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    
                                        
                        {!!form.selectedDropdown && form.selectedDropdown!== OPTIONS.AGE && (
                            <UncontrolledButtonDropdown>
                                <DropdownToggle caret outline color="danger">{'Choose a ' + form.selectedDropdown}</DropdownToggle>
                                <DropdownMenu>
                                    {Object.keys(constraintOptions[form.selectedDropdown]).map(constraint => (
                                        <DropdownItem onClick={() => {addOtherConstraint(form.selectedDropdown, constraintOptions[form.selectedDropdown][constraint])}}>
                                            {constraintOptions[form.selectedDropdown][constraint]}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        )}

                        {!!form.selectedDropdown && form.selectedDropdown===OPTIONS.AGE && (
                            <>
                                <Row >
                                    <Col >
                                        <FormGroup>
                                            <Label  for="minId" className="d-flex flex-row "> Minimum age:  
                                                <Input className="ml-1 mt-0 pt-0 col-4" type="text" id="minId" plaintext={true} value={form.minAge} />
                                            </Label>
                                            <Label for="minAgeId" />
                                            <Input type="range" min="0" max={form.maxAge} value={form.minAge} className="form-control-range" id="minAgeId" name="minAge" onChange={e => {
                                                onChange(e.target.name, e.target.value)
                                            }} />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label className="d-flex flex-row " id="maxId">Maximum age: 
                                                <Input className="ml-1 mt-0 pt-0 col-4" type="text" id="maxId" plaintext={true} value={form.maxAge} />
                                            </Label>
                                            <Label for="maxAgeId" />
                                            <Input type="range" min={form.minAge} max="100" value={form.maxAge} className="form-control-range" id="maxAgeId" name="maxAge" onChange={e => {
                                                onChange(e.target.name, e.target.value)
                                            }}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="danger" outline onClick={() => {
                                    addAgeConstraint(form.minAge, form.maxAge)
                                }}>Add age constraint</Button>
                            </>
                        )}
                        <FormGroup className="mt-3 mb-3">
                            <Label for="consentId">Upload the informed consent to overwrite previous informed consent.</Label>
                            <Input accept=".pdf" type="file" name="informedConsent" id="consentId" onChange={e => {
                                onChange(e.target.name, e.target.files[0])
                            }}/>
                        </FormGroup>
                        <Button className="mt-2" color="secondary" outline onClick={() => {onClick()}}>Cancel</Button>{' '}
                        <Button className="mt-2" color="dark" outline>Create Study</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    </Container>
)

CreateStudyForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
    form: PropTypes.shape({
        studyName: PropTypes.string,
        description: PropTypes.string
    }).isRequired,
    error: PropTypes.object
}

export default CreateStudyForm