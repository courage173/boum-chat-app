import React, { useEffect } from 'react';
import Client from 'socket.io-client';
import { User } from './config';
import store from './redux/store';

const socketAPIUrl =
    process.env.REACT_APP_SOCKET_URL || 'http://localhost:3009';
// import store from './store';
import {
    JoinChannelUserNotification,
    joinChannelNotification,
    getChannel,
} from './redux/actions/channel';

export const socket = new Client(socketAPIUrl, {
    query: { token: User.getAccessToken() },
});

function Socket() {
    useEffect(() => {
        socket.on('connect', () => {
            // eslint-disable-next-line no-console
            console.log('connected to server');

            socket.on('welcome_notification', payload => {
                store.dispatch(JoinChannelUserNotification(payload));
                store.dispatch(getChannel(payload.channelId));
            });
            socket.on('notification', payload => {
                // eslint-disable-next-line no-console
                console.log(payload, 'notification');
                store.dispatch(joinChannelNotification(payload));
            });

            // socket.on('remove-offline-user', id => {
            //     store.dispatch(removeOfflineUser(id));
            // });
            // socket.on('new-message', data => {
            //     store.dispatch(setNewMessage(data.message, data.sender));
            // });
        });
        return socket.emit('end');
    });

    return <div></div>;
}

export default Socket;
