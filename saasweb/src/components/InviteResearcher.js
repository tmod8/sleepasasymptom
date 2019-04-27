import React from 'react'
import {
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Alert,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'reactstrap'

const InviteResearcher = ({onSubmit, onChange, clearForm, validate, setModal, email, error, researcherExists, researchers, showModal, isInvalid}) => (
    <>
        {!!error && <Alert color="danger">{error}</Alert>}
        {!!isInvalid.email && <Alert color="danger">{'Please enter a valid email'}</Alert>}
        {researcherExists && !!email && <Alert color="danger">{'Researcher already has an account.'}</Alert>}
        <Form className="mb-3 p-2">
            <InputGroup >
                <Input className="form-control" name="email" type="email" onChange={e => {
                    onChange(e.target.name, e.target.value, researchers)
                    validate(e.target.name, e.target.value)
                }} value={email} placeholder="Researcher's email"/>
                <InputGroupAddon addonType="append">
                    <Button disabled={researcherExists || isInvalid.email} type="button" outline className="fa fa-user-plus" onClick={() => {setModal(true)}} />
                </InputGroupAddon>
            </InputGroup>  
            <Modal isOpen={showModal} toggle={showModal} show>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    Are you sure you want to invite <strong>{email}</strong> to register an account?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" outline onClick={() => {
                        setModal(false)
                        clearForm()
                    }}>No</Button>
                    <Button color="dark" outline type="submit" onClick={() => {
                        onSubmit(email)
                        setModal(false)
                        clearForm()
                    }}>Yes</Button>
                </ModalFooter>
            </Modal>
            
        </Form>
        
    </>
)

export default InviteResearcher