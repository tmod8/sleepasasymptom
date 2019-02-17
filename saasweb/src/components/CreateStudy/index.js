import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';

import { compose } from 'recompose';

import {
    Form,
    Input,
    FormFeedback,
    Alert,
    Button,
    FormGroup,
    Label,
    ButtonToolbar

} from 'reactstrap';

import * as ROUTES from '../../constants/routes';

const CreateStudy = () => (
    <StudyForm />
);

const INITIAL_STATE = {
    name: '',
    desc: '',
    dateCreated: null,
    researchers: null,
    users: [],
    dateStart: null,
    dateEnd: null,
    constraints: {},
    status: null,
    info: null,
    owner: null,
    currentUser: null,
    error: null
}

class StudyFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            desc: '',
            dateCreated: null,
            researchers: null,
            users: [],
            dateStart: null,
            dateEnd: null,
            constraints: {},
            status: null,
            info: null,
            owner: null,
            currentUser: this.props.firebase.auth.currentUser,
            error: null
        };
    }

    toUTCFormat(date) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[date.getUTCDay()] + ' ' +  date.getUTCMonth() + '/' + date.getUTCDate() + '/' + date.getUTCFullYear() 
            + ' ' +  date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds() + ' UTC';
    }

    componentDidMount() {
        let date = new Date();
        date = this.toUTCFormat(date);
        this.setState({
            currentUser: this.state.currentUser.uid,
            date_created: date,
            researchers: [this.state.currentUser.uid],
            status: "active",
            owner: this.state.currentUser.uid
        });
    }

    onSubmit = event => {
        const { 
            name, 
            desc, 
            date_created, 
            researchers, 
            status, 
            owner
        } = this.state;
        
        this.props.firebase
            .query('study')
            .push()
            .set({
                name,
                desc,
                date_created,
                researchers,
                status,
                owner
            })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.DASHBOARD);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onClick = () => {
        this.props.history.push(ROUTES.VIEW_STUDIES);
    }

    render() {
        const {
            name,
            desc,
            error
        } = this.state;
       
        return (
            <Form onSubmit={ this.onSubmit }>
                {error && <Alert color="danger">{ error.message }</Alert>}
                <FormGroup>
                    <Label for="nameId"></Label>
                    <Input type="text" name="name" id="nameId" value={ name } placeholder="Study name" onChange={ this.onChange }/>
                    <FormFeedback>Please enter a valid name of at least two letters.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="descId"></Label>
                    <Input type="textarea" name="desc" id="descId" value={ desc } placeholder="Study description (optional)" onChange={ this.onChange }/>
                </FormGroup>
                <Button color="secondary" outline onClick={ this.onClick }>Cancel</Button>{' '}
                <Button color="dark">Create Study</Button>
            </Form>
        );
    }
}

const StudyForm = compose(
    withRouter,
    withFirebase
)(StudyFormBase);

export default CreateStudy;

export { StudyForm };