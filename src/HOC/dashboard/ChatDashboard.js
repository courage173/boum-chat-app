import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from '../../components/sidebar/Sidebar';
import './dashboard.css';
import Header from '../../components/header/Header';
import { getUser } from '../../redux/actions/user';

const ChatDashboard = ({ children, toggleSidebar, getUser }) => {
    useEffect(() => {
        getUser();
    });
    return (
        <div className="dashboard-main-wrap">
            <div
                className={`side-bar-container ${
                    toggleSidebar ? 'open-side-bar' : ''
                }`}
            >
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
    toggleSidebar: PropTypes.bool,
    getUser: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUser,
        },
        dispatch
    );
};
const mapStateToProps = state => {
    return {
        toggleSidebar: state.ui.toggleSidebar,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboard);
