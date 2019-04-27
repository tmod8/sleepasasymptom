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

const InputEmail = ({onSubmit, onChange, setModal, clearForm, email, error, emailNotExist, showModal, study, researchers}) => (
    <>
        {!!error && <Alert color="danger">{error}</Alert>}
        {emailNotExist && !!email && <Alert color="danger">{'Email must belong to an existing account.'}</Alert>}
        <Form className="mb-3 p-2">
            <InputGroup >
                <Input className="form-control" name="email" type="text" onChange={e => {onChange(e.target.name, e.target.value, researchers)}} value={email} placeholder="Researcher's email"/>
                <InputGroupAddon addonType="append">
                    <Button disabled={emailNotExist} outline type="button" className="fa fa-user-plus" onClick={() => {setModal(true)}}></Button>
                </InputGroupAddon>
            </InputGroup>  
        </Form>
        <Modal isOpen={showModal} toggle={showModal} show>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    Are you sure you want to add <strong>{email}</strong> to this study?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" outline onClick={() => {
                        setModal(false)
                        clearForm()
                    }}>No</Button>
                    <Button color="dark" outline onClick={() => {
                        onSubmit(study, email, researchers)
                        setModal(false)
                        clearForm()
                    }}>Yes</Button>
                </ModalFooter>
            </Modal>
    </>
)

export default InputEmail