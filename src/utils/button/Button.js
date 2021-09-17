import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ title, runAction, style }) => {
    return (
        <button onClick={() => runAction()} style={style}>
            <span>{title}</span>
        </button>
    );
};

Button.propTypes = {
    title: PropTypes.string,
    runAction: PropTypes.func,
    style: PropTypes.object,
};
export default Button;
