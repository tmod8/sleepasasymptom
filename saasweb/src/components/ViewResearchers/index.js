import React, {Component} from 'react';
import {
    Spinner,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';

import { withFirebase } from '../Firebase';

import * as ROLES from '../../constants/roles';


class ViewResearchers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            researchers: null,
            auth: this.props.firebase.auth.currentUser
        }
    }

    componentDidMount() {
        this.getUser()
        this.getResearchers()
    }

    getUser = () => {
        this.props.firebase.researchers(this.props.firebase.auth.currentUser.uid).once('value', async snapshot => {
            const user = snapshot.val()

            if (!!user) {
                await this.setState({
                    currentUser: user
                })
            }
        })
    }

    getResearchers = () => {
        this.props.firebase.query('researchers').on('value', async snapshot => {
            const resObj = snapshot.val()
            var resList = null
            
            if (!!resObj) {
                resList = Object.keys(resObj).map(key => ({
                    ...resObj[key],
                    uid: key,
                  }));
            }

            await this.setState({
                researchers: resList
            })
        })
    }

    componentWillUnmount() {
        this.props.firebase.query('researchers').off()
    }

    promote = (uid) => {
        this.props.firebase
            .researchers(uid)
            .update({
                role: ROLES.SUPERVISOR
            })
           
    }

    render() {
        const {
            researchers,
            currentUser,
            auth
        } = this.state;
        return(
            <>
                {!researchers && <div>Loading...<Spinner color="secondary" /></div>}
                <ListGroup className="flex-column">
                    {!!researchers && !!currentUser && (currentUser.role === ROLES.ADMIN) && researchers.map(researcher => (
                        auth.uid !== researcher.uid && (
                            <ListGroupItem key={researcher.uid} value={researcher.uid} color="info" action>
                                {researcher.firstName + ' ' + researcher.lastName + ' '}
                                <Button color="info" onClick={ this.promote(researcher.uid)} >promote</Button>
                            </ListGroupItem>
                        )
                        

                    ))}
                </ListGroup>
            </>
        )
    }
}

export default withFirebase(ViewResearchers);