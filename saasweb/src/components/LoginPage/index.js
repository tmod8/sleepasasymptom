import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Row,
    Col,
    Label,
    Button,
    Alert,
    FormFeedback
} from 'reactstrap';

import * as ROUTES from '../../constants/routes';

const LoginPage = () => (
    <Container>
        <div className="py-5 text-center">
            <h1>
                Sleep As A Symptom
            </h1>   
            <Row>
                <Col md={6} className="mx-auto">
                    <LoginForm />
                </Col>
            </Row>
        </div>
    </Container>
);
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}
class LoginFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { email, password } = this.state;
        
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.VIEW_STUDIES);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }

    validate(email, password) {
        return {
            // eslint-disable-next-line
            email: !(/^.+@[^\.].*\.[a-z]{2,}$/).test(email),
            password: !(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).test(password)
        };
    }

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        const isInvalid = this.validate(email, password);

        return( 
            <Form onSubmit={ this.onSubmit }>
                {error && <Alert color="danger">{ error.message }</Alert>}
                <FormGroup>
                    <Label for="emailId"></Label>
                    <Input invalid={ isInvalid.email } type="email" name="email" id="emailId" value={ email } placeholder="Email address" onChange={ this.onChange } />
                    <FormFeedback invalid={ isInvalid.email }>Please enter a valid email.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="passwordId"></Label>
                    <Input invalid={ isInvalid.password } type="password" name="password" id="passwordId" value={ password } placeholder="Password" onChange={ this.onChange } />
                    <FormFeedback invalid={ isInvalid.password }>Please enter a valid password with at least one digit, uppercase letter, and lowercase letter.</FormFeedback>
                </FormGroup>
                <Button color="secondary" className="col-md-4 text-center">Login</Button>
            </Form>
        );
    }
}

const LoginForm = compose(
    withRouter,
    withFirebase
)(LoginFormBase);

export default LoginPage;

export { LoginForm };