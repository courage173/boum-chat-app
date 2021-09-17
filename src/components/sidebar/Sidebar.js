/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './sidebar.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DefaultSidebar from './DefaultSidebar';
import userImage from '../../assets/images/user2.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChannelSidebar from './ChannelSidebar';
import CreateChannelModal from '../modals/createChannel/CreateChannel';

const Sidebar = ({ user }) => {
    const [toggle, setToggle] = useState('');
    const [showModal, toggleModal] = useState(false);
    return (
        <>
            {showModal && <CreateChannelModal toggleModal={toggleModal} />}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                {toggle === 'channel' ? (
                    <ChannelSidebar handleClick={setToggle} />
                ) : (
                    <DefaultSidebar
                        handleClick={setToggle}
                        toggleModal={toggleModal}
                    />
                )}
                <div className="sidebar-footer">
                    <div>
                        <img
                            alt="user image"
                            src={userImage}
                            className="user-profile-image"
                        />
                    </div>
                    <div className="sidebar-footer-profile-name ">
                        <span>{user?.name}</span>
                    </div>
                    <div>
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    user: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        user: state.user?.user,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
