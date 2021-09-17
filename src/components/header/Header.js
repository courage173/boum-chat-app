import React from 'react';
import './header.css';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    return (
        <div className="header-container ">
            <div className="header-title-wrap ">
                <div className="menu-icon">
                    <MenuIcon />
                </div>
                <span>Front End Developers</span>
            </div>
            <div className="close-button-wrap ">
                <CloseIcon />
            </div>
        </div>
    );
};

export default Header;
