import React, { Component } from 'react';
import {
    ListGroup,
    ListGroupItem,
    Spinner,
    Badge,
    FormGroup,
    Form,
    Input,
    Button,
    Label,
    InputGroup,
    InputGroupAddon,

    Col,
    Row
} from 'reactstrap';

import { withFirebase } from '../Firebase';

import * as ROLES from '../../constants/roles';
import * as STATUS from '../../constants/status';

class StudyResearchers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owner: null,
            researchers: null,
            researcherIds: null,
            loading: false,
            email: '',
            addedUser: null,
            study: null,
            currentUser: null
        }
    }

    componentDidMount() {
        this.getUser()
        this.getUpdate()
         
    }

    getUpdate = () => {
        this.props.firebase.study(this.props.location.search.split('=')[1]).on('value', async snapshot => {
            const study = snapshot.val();
            if (!!study) {
                await  this.setState({
                    study: study,
                    owner: study.owner,
                    researcherIds: study.researchers,
                    researchers: null
                });
                this.getIds()
            }
        });
    }

    getUser =  () => {
        this.props.firebase.researchers(this.props.firebase.auth.currentUser.uid).once('value', async snapshot =>{
            var user = snapshot.val()
            if (!!user) {
                await this.setState({currentUser: user})
            }

        })
    }
    getIds = async  () => {
        if (!!this.state.researcherIds) {
            var list = []
            var obj;
             this.state.researcherIds.forEach( async researcher => {
                await this.props.firebase.researchers(researcher).once('value', childSnapshot => {
                    obj = childSnapshot.val()
                    console.log(obj)
                    obj = Object.assign({"uid": researcher}, obj)

                });
                list.push(obj)
                console.log(list)
                
                await this.setState({researchers: list});
            });
            
           console.log(this.state.researchers)
            
        }
        
    }

    componentWillUnmount() {
        this.props.firebase.study(`study/${this.props.location.search.split('=')[1]}`).off();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const {
            email
        }= this.state;
        this.props.firebase.query('researchers')
            .once('value', async snapshot => {
                let user = snapshot.val()
                let list = null
                if (!!user) {
                    list = Object.keys(user).map(key => ({
                        ...user[key],
                        uid: key,
                      }));
                }
                let uid = null
                list.map(l => {
                    if (l.email === email) {
                        return uid = l.uid
                    }
                    return null
                })
                await this.setState({
                    researcherIds: [
                    ...this.state.researcherIds,
                    uid
                    ]
                })
                const researchers = this.state.researcherIds
                this.props.firebase.study(this.props.location.search.split('=')[1])
                    .update({
                        researchers
                    })
                    .then(() => {
                        this.setState({ email: '' });
                    });
            })
            event.preventDefault();
    }

    

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getUpdate();
        }
    }

    archiveStudy = () => {
        this.props.firebase
            .study(this.props.location.search.split('=')[1])
            .update({
                status: STATUS.ARCHIVED
            })
    }

    render() {
        const {
            owner,
            researchers,
            email,
            currentUser,
            study
        } = this.state;
       
        return (
            <>
                {!!currentUser && !!study && (currentUser.role === ROLES.ADMIN && study.status===STATUS.ACTIVE) && (
                    <Button color="danger" onClick={this.archiveStudy}>archive</Button>
                )} {' '}
                <Button  color="info">info</Button>
                <span className="d-flex align-items-center text-muted mb-2">
                    Researchers
                </span>
                {!!researchers && !!currentUser && (currentUser.role === ROLES.ADMIN || currentUser.role === ROLES.SUPERVISOR) && (
                    <Form onSubmit={this.onSubmit} className="mb-3 p-2">
                    <InputGroup >
                            <Input plaintext={!researchers} className="form-control" name="email" type="text" onChange={this.onChange} value={email} placeholder="Researcher's email"/>
                            <InputGroupAddon addonType="append">
                                <Button disabled={!researchers} outline type="submit" className="fa fa-user-plus"></Button>
                            </InputGroupAddon>
                        </InputGroup>  
                    </Form>
                )}
                {!researchers && <div>Loading...<Spinner color="secondary" /></div>}
                <ListGroup className="flex-column">
                {!!researchers &&  (researchers.map((researcher) =>
                    <ListGroupItem key={researcher.uid} action>
                        {researcher.firstName + ' ' + researcher.lastName + ' ' }
                        {(owner === researcher.uid) ? <Badge pill color="warning">owner</Badge>: null}
                    </ListGroupItem>
                ))}
                </ListGroup>
            </>
        );
    }
}

export default withFirebase(StudyResearchers);