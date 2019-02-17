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
            study: null
        }
    }

    componentDidMount() {
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
                console.log(this.state.researchers)
                this.getIds()
            }
        });
    }

    getIds = async  () => {
        if (!!this.state.researcherIds) {
            var list = []
            var obj;
             this.state.researcherIds.forEach( async researcher => {
                await this.props.firebase.researchers(researcher).once('value', childSnapshot => {
                    obj = childSnapshot.val()
                    obj = Object.assign({"uid": researcher}, obj)
                });
                list.push(obj)
                console.log(list[1])
                
                await this.setState({researchers: list});
            });
            
           console.log(this.state.researchers)
            
        }
        
    }

    componentWillUnmount() {
        this.props.firebase.study(`study/${this.props.location.search.split('=')[1]}`).off();
    }

    onChange = event => {
        console.log(event.target)
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

    render() {
        const {
            owner,
            researchers,
            email
        } = this.state;
       
        return (
            <>
                <span className="d-flex align-items-center text-muted mb-2">
                    Researchers
                </span>
                {!!researchers && (
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
                {!!researchers && (researchers.map((researcher) =>
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