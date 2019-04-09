import React from 'react';
import PropTypes from 'prop-types'

const LogoutButton = ({ signOut }) => (
    <span onClick={() => {signOut()}}>
        <i className="fa fa-power-off"></i>
    </span>
);

LogoutButton.propTypes = {
    signOut: PropTypes.func.isRequired
}

export default LogoutButton;