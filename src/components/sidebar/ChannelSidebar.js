import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userImg from '../../assets/images/user2.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PropTypes from 'prop-types';

const ChannelSidebar = ({ handleClick, channel }) => {
    const userList = channel.channel.users || [];
    const activeChanel = channel.channel || {};
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
                    <span>{activeChanel.name}</span>
                </div>
                <div className="sidebar-channel-description ">
                    <span>{activeChanel.description}</span>
                </div>
            </div>
            <div style={{ marginTop: 30 }} className="channel-list-container">
                {userList.map(user => (
                    <div className="channel-list" key={user?.userId?._id}>
                        <div className="channel-badge">
                            <img
                                alt="user image"
                                src={userImg}
                                className="user-profile-image"
                            />
                        </div>
                        <div className="user-name-text">
                            <span>{user?.userId?.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ChannelSidebar.propTypes = {
    handleClick: PropTypes.func,
    channel: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};
const mapStateToProps = state => {
    return {
        toggleSidebar: state.ui.toggleSidebar,
        channel: state.channel.activeChannel,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelSidebar);
