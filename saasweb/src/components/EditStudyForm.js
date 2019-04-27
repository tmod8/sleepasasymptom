import React from 'react'
import {
    FormGroup,
    Form,
    Label,
    Input,
    ListGroup,
    FormFeedback,
    Button,
    ListGroupItem,
    DropdownToggle,
    UncontrolledButtonDropdown,
    DropdownMenu,
    Col,
    Row,
    Container,
    Alert,
    DropdownItem
} from 'reactstrap'
import {OPTIONS} from '../constants/constraints'

const EditStudyForm = ({onSubmit, onCancel, onChange, onEdit, form, selectDropdown, addAgeConstraint, addOtherConstraint, deleteConstraint, constraintOptions, style, study, informedConsent, error, selectedStudy }) => (
    <Container>
            <div className="py-3">
                <Row>
                    <Col lg={10} >
                        <h2 className="d-flex justify-content-between mb-3 text-muted">
                            <span>Edit Study</span>
                            <div className="d-flex align-items-center text-muted" >
                                <Button outline color="secondary" className="fa fa-edit" onClick={() => {
                                    onEdit({studyName: study.studyName, description: study.description, constraints: study.constraints})
                                    }}>{' Edit'}</Button>
                            </div>
                        </h2>
                        <Form onSubmit={e => {
                            e.preventDefault()
                            onSubmit({studyName: form.studyName, description: form.description, constraints: form.constraints, id: selectedStudy, informedConsent: form.informedConsent})
                        }}>
                        {error && <Alert color="danger">{ error.message }</Alert>}
                        <FormGroup>
                            <Label for="nameId" className="lead">Name</Label>
                            <Input plaintext={!form.isEditing} type="text" name="studyName" id="nameId" value={form.isEditing ? form.studyName : study.studyName } placeholder="Study name" onChange={e => {
                                onChange(e.target.name, e.target.value)
                            }}/>
                            <FormFeedback>Please enter a valid name of at least two letters.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="descId" className="lead">Description</Label>
                            <Input plaintext={!form.isEditing} type="textarea" name="description" id="descId" value={form.isEditing ? form.description : study.description} placeholder={form.isEditing && "Study description (optional)"} onChange={e => {
                                onChange(e.target.name, e.target.value)
                            }}/>
                        </FormGroup>

                        {form.isEditing ? (<ListGroup>
                            {!!form.constraints  && Object.keys(form.constraints).map(constraint => (
                                
                                Object.keys(form.constraints[constraint]).length > 0 && (<ListGroupItem>
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
                            </ListGroup>)
                        : (
                            <ListGroup>
                            {!!study.constraints  && Object.keys(study.constraints).map(constraint => (
                                
                                Object.keys(study.constraints[constraint]).length > 0 && (<ListGroupItem>
                                    {constraint + ': '}
                                    <ul style={style}>
                                        {Object.keys(study.constraints[constraint]).map(item => (
                                            
                                            <li>{(study.constraints[constraint][item]===true || study.constraints[constraint][item]===false) ? item : item + ': ' + study.constraints[constraint][item]}
                                            
                                            </li>
                                        ))}
                                    </ul>
                                </ListGroupItem>)
                            ))}
                            </ListGroup>
                        )}
                        {form.isEditing && (
                            <>
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
                            </>
                        )}
                        <FormGroup>
                            
                            <embed id="con" hidden={true}  width="500" height="375"  type="application/pdf" />
                        </FormGroup>
                        <FormGroup>
                        {!!informedConsent && (
                            <>
                                <Button color="info" outline onClick={() => {
                                    var img = document.getElementById('con')
                                    informedConsent.then(u => {
                                        img.src = u
                                        img.hidden = false
                                })
                                .catch(e =>{
                                    alert("There is no informed consent for this study")
                                })
                                }}>View Informed Consent</Button>
                                
                            </>
                        ) }
                        </FormGroup>
                        {form.isEditing &&
                            <FormGroup className="m-2">
                                <Label for="consentId">Upload a informed consent (Will replace existing document).</Label>
                                <Input accept=".pdf" type="file" name="informedConsent" id="consentId" onChange={e => {
                                    onChange(e.target.name, e.target.files[0])
                                }}/>
                            </FormGroup>
                        }
                        <Button color="secondary" outline onClick={() => {onCancel()}}>Cancel</Button>{' '}
                        <Button disabled={!form.isEditing} color="dark" outline>Save Changes</Button>
                    </Form>
                </Col>  
            </Row>
        </div>
    </Container>
)

export default EditStudyForm
