import React, { Component } from 'react';
import {
    ButtonToolbar,
    ListGroup
} from 'reactstrap';

import { withFirebase } from '../Firebase';

class MainPanel extends Component {
    constructor(props) {
        super(props);

        this.state ={
            loading: false,
            query: []
        };
    }

    componentDidMount() {
        this.setState({ loading:true });


        this.props.firebase.query('users').on('value', snapshot => {
            const queryObj = snapshot.val();

            const queryList = Object.keys(queryObj).map(key => ({
                ...queryObj[key],
                uid: key,
              }));

            this.setState({
                query: queryList,
                loading: false
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.query('users').off();
      }

    render() {
        const {
            query,
            loading
        } = this.state;
        return(
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 bg-white">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    <ButtonToolbar className="mb-2 mb-md-0"></ButtonToolbar>
                    {loading && <div>Loading...</div>}
                </div>
                <ul>{query.map(q => (<li key={q.uid}>{q.uid}</li>))}</ul>
                <ListGroup flush className="flex-column"></ListGroup>

            </main>
        );
    }
}

export default withFirebase(MainPanel);