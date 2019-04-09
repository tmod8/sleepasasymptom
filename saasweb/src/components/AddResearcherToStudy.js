import React from 'react'
import {

} from 'reactstrap'
import * as ROLES from '../constants/roles'
import PropTypes from 'prop-types'

const AddResearcherToStudy = ({onSubmit, onChange, researchers, currentUser}) => (
    <>
        {!!researchers && !!currentUser && (currentUser.role === ROLES.ADMIN || currentUser.role === ROLES.SUPERVISOR) && (
            <Form onSubmit={onSubmit()} className="mb-3 p-2">
                <InputGroup >
                    <Input plaintext={!researchers} className="form-control" name="email" type="text" onChange={onChange()} value={email} placeholder="Researcher's email"/>
                    <InputGroupAddon addonType="append">
                        <Button disabled={!researchers} outline type="submit" className="fa fa-user-plus"></Button>
                    </InputGroupAddon>
                </InputGroup>  
            </Form>
        )}
    </>
)

AddResearcherToStudy.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
}

export default AddResearcherToStudy