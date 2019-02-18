import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import {
    ButtonToolbar,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Spinner,
    Badge,
    Button
} from 'reactstrap';

import * as ROUTES from '../../constants/routes';
import * as STATUS from '../../constants/status';
import * as ROLES from '../../constants/roles';


class ViewStudies extends Component {
    constructor(props) {
        super(props);

        this.state ={
            loading: false,
            studies: null,
            allStudies: null,
            auth: this.props.firebase.auth.currentUser,
            selected: null,
            currentUser: null
        };
    }

    componentDidMount() {
        this.setState({ loading:true });
        this.props.firebase.query('study').on('value', async snapshot => {
            const studyObj = snapshot.val();
            let studyList = null;
            
            if (!!studyObj) {
                studyList = Object.keys(studyObj).map(key => ({
                    ...studyObj[key],
                    uid: key,
                  }));
            }
            console.log(studyList)
            await this.setState({
                allStudies: studyList
            });
            this.getUser()
            this.getMyStudies()
        });
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

    getMyStudies = () => {
        let list = []
        this.state.allStudies.map(study => {
            if (study.researchers.includes(this.state.auth.uid)) {
                list.push(study)
            }
        });
        this.setState({
            studies: list,
            selected: this.props.location.search.split('=')[1],
            loading: false
        });
    }

    componentWillUnmount() {
        this.props.firebase.query('study').off();
    }

    onClickStudy = async event => {
        this.props.history.push( `${ROUTES.VIEW_STUDIES}/?id=${event.target.value}` );
        await this.setState({
            selected: event.target.value
        })
    }

    

    render() {
        const {
            studies,
            loading,
            selected,
            currentUser
        } = this.state;

        return(
            <>
                {loading && <div>Loading...<Spinner color="secondary" /></div>}
                <ListGroup className="flex-column">
                {studies &&   studies.map(study => (
                    <ListGroupItem active={study.uid === selected ? true : false} tag="button" key={ study.uid } value={study.uid} color="info" action onClick={ this.onClickStudy }>
                        <ListGroupItemHeading>
                            { study.name + ' ' }
                            <Badge pill color={ study.status===STATUS.ACTIVE ? "success" : "danger" }>{ study.status }</Badge>
                        </ListGroupItemHeading>
                        <ListGroupItemText>{ study.desc }</ListGroupItemText>
                    </ListGroupItem>
                ))}</ListGroup>
            </>
           
        );
    }
}



export default withRouter(withFirebase(ViewStudies));