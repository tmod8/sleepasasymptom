import React from 'react';
import {
    ButtonToolbar,
    ListGroup
} from 'reactstrap';

const MainPanel = () => (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 bg-white">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <ButtonToolbar className="mb-2 mb-md-0"></ButtonToolbar>
        </div>
        <ListGroup flush className="flex-column"></ListGroup>

    </main>
);

export default MainPanel;