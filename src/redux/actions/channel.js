import * as types from '../constants/channels';
import { getApi, postApi } from '../../utils/api';
import errors from '../../utils/errors';
import { socket } from '../../socket';

//creating a channel
export function createChannelError(error) {
    return {
        type: types.CREATE_CHANNEL_FAILURE,
        payload: error,
    };
}

export function createChannelSuccess(payload) {
    return {
        type: types.CREATE_CHANNEL_SUCCESS,
        payload,
    };
}

export function createChannelRequest() {
    return {
        type: types.CREATE_CHANNEL_REQUEST,
    };
}

// Calls the API to register a user.
export function createChannel(data) {
    return dispatch => {
        const promise = postApi('channel/createChannel', data);
        dispatch(createChannelRequest());
        promise.then(
            function (payload) {
                dispatch(createChannelSuccess(payload.data));
            },
            function (error) {
                if (error && error.response && error.response.data)
                    error = error.response.data;
                if (error && error.data) {
                    error = error.data;
                }
                if (error && error.message) {
                    error = error.message;
                } else {
                    error = 'Network Error';
                }
                dispatch(createChannelError(errors(error)));
            }
        );

        return promise;
    };
}

//creating a channel
export function getAllChannelError(error) {
    return {
        type: types.GET_CHANNELS_FAILURE,
        payload: error,
    };
}

export function getAllChannelSuccess(payload) {
    return {
        type: types.GET_CHANNELS_SUCCESS,
        payload,
    };
}

export function getAllChannelRequest() {
    return {
        type: types.GET_CHANNELS_REQUEST,
    };
}

// Calls the API to register a user.
export function getChannels() {
    return dispatch => {
        const promise = getApi('channel');
        dispatch(getAllChannelRequest());
        promise.then(
            function (payload) {
                dispatch(getAllChannelSuccess(payload.data));
            },
            function (error) {
                if (error && error.response && error.response.data)
                    error = error.response.data;
                if (error && error.data) {
                    error = error.data;
                }
                if (error && error.message) {
                    error = error.message;
                } else {
                    error = 'Network Error';
                }
                dispatch(getAllChannelError(errors(error)));
            }
        );

        return promise;
    };
}

//creating a channel
export function joinChannelNotification(error) {
    return {
        type: types.JOIN_CHANNEL_NOTIFICATION,
        payload: error,
    };
}

export function JoinChannelUserNotification(payload) {
    return {
        type: types.JOIN_CHANNEL_USER_NOTIFICATION,
        payload,
    };
}
export function navigateToChannel(payload) {
    socket.emit('joinRoom', { channelId: payload._id });
    return {
        type: types.NAVIGATE_TO_CHANNEL,
        payload,
    };
}

export function JoinChannelRequest() {
    return {
        type: types.JOIN_CHANNEL_REQUEST,
    };
}

export function joinChannel(channelId) {
    return dispatch => {
        dispatch(JoinChannelRequest());
        socket.emit('joinChannel', { channelId });
    };
}

//get channel by id

//creating a channel
export function getChannelError(error) {
    return {
        type: types.GET_CHANNEL_FAILURE,
        payload: error,
    };
}

export function getChannelSuccess(payload) {
    return {
        type: types.GET_CHANNEL_SUCCESS,
        payload,
    };
}

export function getChannelRequest() {
    return {
        type: types.GET_CHANNELS_REQUEST,
    };
}

// Calls the API to register a user.
export function getChannel(channelId) {
    return dispatch => {
        const promise = getApi(`channel/${channelId}/singleChannel`);
        dispatch(getChannelRequest());
        promise.then(
            function (payload) {
                dispatch(getChannelSuccess(payload.data));
            },
            function (error) {
                if (error && error.response && error.response.data)
                    error = error.response.data;
                if (error && error.data) {
                    error = error.data;
                }
                if (error && error.message) {
                    error = error.message;
                } else {
                    error = 'Network Error';
                }
                dispatch(getChannelError(errors(error)));
            }
        );

        return promise;
    };
}
