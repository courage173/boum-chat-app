import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
// import Client from 'socket.io-client';
// import { User } from './config';
import store from './redux/store';
import {
    JoinChannelUserNotification,
    joinChannelNotification,
    getChannel,
    addMessageToStore,
} from './redux/actions/channel';
import { User } from './config';

export let socketIo;

function Socket({ socket }) {
    useEffect(() => {
        socketIo = socket;
        const connectionListener = () => {
            // eslint-disable-next-line no-console
            console.log('connected to server');
        };
        const welcomeListener = payload => {
            store.dispatch(JoinChannelUserNotification(payload));
            store.dispatch(getChannel(payload.channelId));
        };
        const notificationListener = payload => {
            store.dispatch(joinChannelNotification(payload));
            store.dispatch(getChannel(payload.channelId));
        };
        const messageListener = payload => {
            // eslint-disable-next-line no-console
            console.log(User.getUserId() !== payload.userId);
            if (User.getUserId() !== payload.userId) {
                store.dispatch(addMessageToStore(payload));
            }
        };
        socket.on('connect', connectionListener);
        socket.on('welcome_notification', welcomeListener);
        socket.on('notification', notificationListener);
        socket.on('newMessage', messageListener);
        return () => {
            socket.off('connect', connectionListener);
            socket.off('welcome_notification', welcomeListener);
            socket.off('notification', notificationListener);
            socket.off('newMessage', messageListener);
        };
    }, [socket]);
    return <></>;
}

Socket.propTypes = {
    socket: PropTypes.object,
};
export default Socket;
