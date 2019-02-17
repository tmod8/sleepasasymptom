import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Form,
    FormGroup,
    Button,
    Alert,
    FormFeedback
} from 'reactstrap';

import * as ROUTES from '../../constants/routes';

const RegistrationPage = () => (
    <Container>
        <div className="py-5 text-center">
            <h1>
                Sleep As A Symptom
            </h1>
            <Row>
                <Col md={6} className="mx-auto">
                    <RegistrationForm />
                </Col>
            </Row>
        </div>
    </Container>
);

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null
};

class RegistrationFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    onSubmit = event => {
        const { firstName, lastName, email, password } = this.state;
        
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                return this.props.firebase
                .researchers(authUser.user.uid)
                .set({
                    firstName,
                    lastName,
                    email
                })
            })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.VIEW_STUDIES);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    validate(firstName, lastName, email, password, confirmPassword) {
        return {
            firstName: firstName.length < 2 || firstName === '',
            lastName: lastName.length < 2 || lastName === '',
            // eslint-disable-next-line
            email: !(/^.+@[^\.].*\.[a-z]{2,}$/).test(email),
            password: !(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).test(password),
            confirmPassword: password !== confirmPassword
        };
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            error
        } = this.state;

        const isInvalid = this.validate(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword);
 
        return(
            <Form onSubmit={this.onSubmit}>
                {error && <Alert color="danger">{ error.message } </Alert>}
                <FormGroup>
                    <Label for="firstNameId"></Label>
                    <Input invalid={ isInvalid.firstName } type="text" name="firstName" id="firstNameId" value={ firstName } placeholder="First name" onChange={ this.onChange } />
                    <FormFeedback invalid={ isInvalid.firstName }>Please enter your first name.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="lastNameId"></Label>
                    <Input invalid={ isInvalid.lastName } type="text" name="lastName" id="lastNameId" value={ lastName } placeholder="Last name" onChange={ this.onChange }/>
                    <FormFeedback invalid={ isInvalid.lastName }>Please enter your last name.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="emailId"></Label>
                    <Input invalid={ isInvalid.email } type="email" name="email" id="emailId" value={ email } placeholder="Email address" onChange={ this.onChange } />
                    <FormFeedback invalid={ isInvalid.email }>Please enter a valid email.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="passwordId"></Label>
                    <Input invalid={ isInvalid.password } type="password" name="password" id="passwordId" value={ password } placeholder="Password" onChange={ this.onChange } />
                    <FormFeedback invalid={ isInvalid.password }>Please enter a valid password with at least one digit, lowercase letter, and uppercase letter.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPwId"></Label>
                    <Input invalid={ isInvalid.confirmPassword } type="password" name="confirmPassword" id="confirmPwId" value={ confirmPassword } placeholder="Confirm password" onChange={ this.onChange }/>
                    <FormFeedback invalid={ isInvalid.confirmPassword }>Passwords must match.</FormFeedback>
                </FormGroup>
                <Button disabled={ Object.keys(isInvalid).some(x => isInvalid[x]) } color="secondary" className="col-md-4 text-center">Register</Button>
            </Form>         
        );
    }
};

const RegistrationForm = compose (
     withRouter,
     withFirebase
     )(RegistrationFormBase);

export default RegistrationPage;

export { RegistrationForm };