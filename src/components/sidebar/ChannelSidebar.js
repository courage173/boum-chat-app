import React from 'react';
import user from '../../assets/images/user2.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PropTypes from 'prop-types';

const ChannelSidebar = ({ handleClick }) => {
    const users = ['courage kola', 'wole', 'Efosa', 'Joe Cole'];
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <div
                    style={{ marginRight: 5, cursor: 'pointer' }}
                    onClick={() => handleClick('')}
                >
                    <ArrowBackIosIcon />
                </div>
                <div>
                    <span className="top-title">All Channels</span>
                </div>
            </div>
            <div style={{ padding: '0 20px', marginTop: 20 }}>
                <div className="sidebar-channel-name">
                    <span>Frontend-Developers</span>
                </div>
                <div className="sidebar-channel-description ">
                    <span>
                        Pellentesque sagittis elit enim, sit amet ultrices
                        tellus accumsan quis. In gravida mollis purus, at
                        interdum arcu tempor non
                    </span>
                </div>
            </div>
            <div style={{ marginTop: 30 }}>
                {users.map(channel => (
                    <div className="channel-list" key={channel}>
                        <div className="channel-badge">
                            <img
                                alt="user image"
                                src={user}
                                className="user-profile-image"
                            />
                        </div>
                        <div className="user-name-text">
                            <span>{channel}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ChannelSidebar.propTypes = {
    handleClick: PropTypes.func,
};
export default ChannelSidebar;
