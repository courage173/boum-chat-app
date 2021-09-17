import React from 'react';
import PropTypes from 'prop-types';
import './authLayout.css';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="auth-children">{children}</div>
        </div>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.element,
};
export default AuthLayout;
