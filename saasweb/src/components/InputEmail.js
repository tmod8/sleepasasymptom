import React from 'react'
import {
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Alert
} from 'reactstrap'

const InputEmail = ({onSubmit, onChange, email, error, emailNotExist, study, researchers}) => (
    <>
        {!!error && <Alert color="danger">{error}</Alert>}
        {emailNotExist && !!email && <Alert color="danger">{'Email must belong to an existing account.'}</Alert>}
        <Form onSubmit={e => {
                e.preventDefault()
                onSubmit(study, email, researchers)
            }} className="mb-3 p-2">
            <InputGroup >
                <Input className="form-control" name="email" type="text" onChange={e => {onChange(e.target.name, e.target.value, researchers)}} value={email} placeholder="Researcher's email"/>
                <InputGroupAddon addonType="append">
                    <Button disabled={emailNotExist} outline type="submit" className="fa fa-user-plus"></Button>
                </InputGroupAddon>
            </InputGroup>  
        </Form>
    </>
)

export default InputEmail