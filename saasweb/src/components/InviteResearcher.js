import React from 'react'
import {
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Alert
} from 'reactstrap'

const InviteResearcher = ({onSubmit, onChange, email, error, researcherExists, researchers}) => (
    <>
        {!!error && <Alert color="danger">{error}</Alert>}
        {researcherExists && !!email && <Alert color="danger">{'Researcher already has an account.'}</Alert>}
        <Form onSubmit={e => {
                e.preventDefault()
                onSubmit(email)
            }} className="mb-3 p-2">
            <InputGroup >
                <Input className="form-control" name="email" type="email" onChange={e => {onChange(e.target.name, e.target.value, researchers)}} value={email} placeholder="Researcher's email"/>
                <InputGroupAddon addonType="append">
                    <Button disabled={researcherExists} outline type="submit" className="fa fa-user-plus"></Button>
                </InputGroupAddon>
            </InputGroup>  
        </Form>
    </>
)

export default InviteResearcher