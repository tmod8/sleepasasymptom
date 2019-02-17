import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Button,
    Spinner
} from 'reactstrap';

const Profile = () => (
    <div>
        <Container>
        <div className="py-5 text-center">
            <Row>
                <Col lg={6} >
                    <ProfileForm />
                </Col>
            </Row>
        </div>
    </Container>
    </div>
);

class ProfileFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            edit: true,
            auth: props.firebase.auth.currentUser,
            error: null,
            loading: false
        };
    }

    
     componentDidMount() {
        this.setState({ loading: true });
       
        
        this.props.firebase.researchers(this.state.auth.uid).on('value', snapshot => {
            const userObj = snapshot.val();

            console.log(userObj);
            this.setState({
                firstName: userObj.firstName,
                lastName: userObj.lastName,
                email: userObj.email,
                user: userObj,
                loading: false
            });
          });
    }

    componentWillUnmount() {
        this.props.firebase.researchers(this.state.auth.uid).off();
      }

    onClickEdit = () => {
        this.setState({
            edit: false
        });
    }

    onClickCancel = event => {
        this.setState({ 
            firstName: this.state.user.firstname,
            lastName: this.state.user.lastName,
            email: this.state.user.email,
            edit: true,
            error: null
        }); 
        event.preventDefault();   
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { 
            firstName,
            lastName,
            email
        } = this.state;
        
        this.props.firebase
            .researchers(this.state.auth.uid)
            .update({
                firstName,
                lastName,
                email
            })
            .then(() => {
                this.setState({ edit: true });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            user,
            edit,
            loading
        } = this.state;

        return (
            <>
                <h2 className="d-flex justify-content-between mt-1 mb-5 text-muted">
                    <span>Profile</span>
                    <div className="d-flex align-items-center text-muted" >
                        <Button outline color="secondary" className="fa fa-edit" onClick={ this.onClickEdit }>{' '} Edit</Button>
                    </div>
                </h2>
                {loading && <div>Loading...<Spinner color="secondary" /></div>}
                {!!user && (
                    <Form onSubmit={ this.onSubmit }>
                        <FormGroup row>
                            <Label for="firstNameId" className="lead">First Name</Label>
                            <Input plaintext={ edit } type="text" name="firstName" id="firstNameId" value={ firstName } onChange={ this.onChange } />
                            <FormFeedback>Please enter a valid name of at least two letters.</FormFeedback>  
                        </FormGroup>
                        
                        <FormGroup row>
                            <Label for="lastNameId" className="lead">Last Name</Label>
                            <Input plaintext={ edit } type="text" name="lastName" id="lastNameId" value={ lastName } onChange={ this.onChange } />
                            <FormFeedback>Please enter a valid name of at least two letters</FormFeedback>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="emailId" className="lead">Email</Label>
                            <Input plaintext={ edit } type="email" name="email" id="emailId" value={ email } onChange={ this.onChange } />
                            <FormFeedback>Please enter a valid email.</FormFeedback>
                        </FormGroup>
                        <Button disabled={ edit } color="secondary" outline onClick={ this.onClickCancel }>Cancel</Button>{' '}
                        <Button disabled={ edit } color="dark">Apply</Button>
                    </Form>
                )}
                
            </>
        );
    }
    
}

const ProfileForm = compose(
    withFirebase
)(ProfileFormBase);

export default Profile;

export { ProfileForm };