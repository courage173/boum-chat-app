/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './sidebar.css';
import DefaultSidebar from './DefaultSidebar';
import user from '../../assets/images/user2.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChannelSidebar from './ChannelSidebar';

const Sidebar = () => {
    const [toggle, setToggle] = useState('');
    return (
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
                <DefaultSidebar handleClick={setToggle} />
            )}
            <div className="sidebar-footer">
                <div>
                    <img
                        alt="user image"
                        src={user}
                        className="user-profile-image"
                    />
                </div>
                <div className="sidebar-footer-profile-name ">
                    <span>Courage Kola</span>
                </div>
                <div>
                    <KeyboardArrowDownIcon />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
