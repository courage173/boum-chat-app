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
import ProfileModal from '../modals/profile/ProfileModal';

const Sidebar = ({ user, toggleModal }) => {
    const [toggle, setToggle] = useState('');
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
                onClick={() => setOpen(false)}
            >
                {toggle === 'channel' ? (
                    <ChannelSidebar handleClick={setToggle} />
                ) : (
                    <DefaultSidebar
                        handleClick={setToggle}
                        toggleModal={toggleModal}
                    />
                )}
                {open && <ProfileModal />}
                <div
                    className="sidebar-footer"
                    onClick={e => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <div>
                        <img
                            alt="user image"
                            src={userImage}
                            className="user-profile-image"
                        />
                    </div>
                    <div
                        className="sidebar-footer-profile-name "
                        style={{ marginLeft: 5 }}
                    >
                        <span>{user?.name}</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    user: PropTypes.object,
    toggleModal: PropTypes.func,
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
