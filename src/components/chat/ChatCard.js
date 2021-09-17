import React from 'react';
import user from '../../assets/images/user2.png';

const ChatCard = () => {
    return (
        <div className="chart-card-wrap">
            <div>
                <img alt="user" src={user} />
            </div>
            <div className="chart-card-message-container">
                <div className="chart-card-text-wrap">
                    <span className="chart-card-text-name">
                        Courage Osemwengie
                    </span>
                    <span className="chart-card-text-date">
                        yesterday at 2am
                    </span>
                </div>
                <div className="chart-message">
                    <span>
                        Suspendisse enim tellus, elementum quis dictum sed,
                        sodales at mauris 😀 Suspendisse enim tellus, elementum
                        quis dictum sed, sodales at mauris 😀 Suspendisse enim
                        tellus, elementum quis dictum sed, sodales at mauris 😀
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatCard;
