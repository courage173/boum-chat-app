import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import './dashboard.css';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';

const ChatDashboard = ({ children }) => {
    return (
        <div className="dashboard-main-wrap">
            <div className="side-bar-container ">
                <Sidebar />
            </div>
            <div className="dashboard-right-side">
                <Header />
                <div className="children-wrap">{children}</div>
            </div>
        </div>
    );
};

ChatDashboard.propTypes = {
    children: PropTypes.element,
};
export default ChatDashboard;
