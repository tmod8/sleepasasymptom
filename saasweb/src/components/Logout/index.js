import React from 'react';
import {

} from 'reactstrap';

import { withFirebase } from '../Firebase';

const LogoutButton = ({ firebase }) => (
    <span onClick={ firebase.doSignOut }>
        <i className="fa fa-power-off"></i>
    </span>
);

export default withFirebase(LogoutButton);