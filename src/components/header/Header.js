import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './header.css';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSideBar } from '../../redux/actions/ui';

const Header = ({ toggleSideBar }) => {
    return (
        <div className="header-container ">
            <div className="header-title-wrap ">
                <div className="menu-icon" onClick={() => toggleSideBar()}>
                    <MenuIcon />
                </div>
                <span>Front End Developers</span>
            </div>
            <div className="close-button-wrap " onClick={() => toggleSideBar()}>
                <CloseIcon />
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            toggleSideBar,
        },
        dispatch
    );
};

Header.propTypes = {
    toggleSideBar: PropTypes.func.isRequired,
    //initialValues: PropTypes.object,
};
export default connect(null, mapDispatchToProps)(Header);
