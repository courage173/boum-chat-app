import React from 'react';
import './profile.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TwitterIcon from '@mui/icons-material/Twitter';
import LogoutIcon from '@mui/icons-material/Logout';
import { history } from '../../../redux/store';
import { User } from '../../../config';

const ProfileModal = () => {
    const handleLogout = () => {
        User.removeAccessToken();
        history.push('/login');
    };
    return (
        <div
            className="profile-modal-container"
            onClick={e => e.stopPropagation()}
        >
            <button className="profile-link-button">
                <AccountCircleIcon />
                <span className="profile-link-button-text">My Profile</span>
            </button>
            <div></div>
            <button className="profile-link-button">
                <TwitterIcon />
                <span className="profile-link-button-text">Tweeter</span>
            </button>
            <div
                style={{ borderBottom: '1px solid #3C393F', padding: '2px 0' }}
            ></div>
            <button className="profile-link-button" onClick={handleLogout}>
                <LogoutIcon style={{ color: 'red' }} />
                <span
                    className="profile-link-button-text"
                    style={{ color: 'red' }}
                >
                    Logout
                </span>
            </button>
        </div>
    );
};

export default ProfileModal;
