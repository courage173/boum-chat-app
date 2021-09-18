import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import user from '../../assets/images/user2.png';

const ChatCard = ({ data }) => {
    return (
        <div className="chart-card-wrap">
            <div>
                <img alt="user" src={user} />
            </div>
            <div className="chart-card-message-container">
                <div className="chart-card-text-wrap">
                    <span className="chart-card-text-name">{data.name}</span>
                    <span
                        className="chart-card-text-date"
                        style={{ marginLeft: 4 }}
                    >
                        {moment(data.createdAt).calendar()}
                    </span>
                </div>
                <div className="chart-message">
                    <span>{data.message}</span>
                </div>
            </div>
        </div>
    );
};

ChatCard.propTypes = {
    data: PropTypes.object,
};
export default ChatCard;
