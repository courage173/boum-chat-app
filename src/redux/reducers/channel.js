import * as types from '../constants/channels';
const initialState = {
    createChannel: {
        requesting: false,
        error: null,
        success: false,
    },
    getChannels: {
        requesting: false,
        error: null,
        success: false,
    },
    getChannel: {
        requesting: false,
        error: null,
        success: false,
    },
    joinChannelRequest: false,
    channels: [],
    activeChannel: {
        channel: {},
        messages: [],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_CHANNEL_REQUEST:
            return Object.assign({}, state, {
                createChannel: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.CREATE_CHANNEL_SUCCESS:
            return Object.assign({}, state, {
                createChannel: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                channels: {
                    ...state.channels,
                    channels: state.channels?.channels.concat(action.payload),
                },
            });
        case types.CREATE_CHANNEL_FAILURE:
            return Object.assign({}, state, {
                createChannel: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        case types.GET_CHANNELS_REQUEST:
            return Object.assign({}, state, {
                getChannels: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_CHANNELS_SUCCESS:
            return Object.assign({}, state, {
                getChannels: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                channels: action.payload,
            });
        case types.GET_CHANNELS_FAILURE:
            return Object.assign({}, state, {
                getChannels: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        case types.JOIN_CHANNEL_REQUEST:
            return Object.assign({}, state, {
                joinChannelRequest: true,
            });
        case types.JOIN_CHANNEL_NOTIFICATION:
            return Object.assign({}, state, {
                joinChannelRequest: false,
                activeChannel: {
                    ...state.activeChannel,
                    messages: state.activeChannel.messages.concat({
                        ...action.payload,
                        type: 'user_joined',
                    }),
                },
            });
        case types.JOIN_CHANNEL_USER_NOTIFICATION:
            return Object.assign({}, state, {
                activeChannel: {
                    channel: state.channels?.channels.find(
                        channel => channel._id === action.payload.channelId
                    ),
                    messages: state.activeChannel.messages.concat({
                        ...action.payload,
                        type: 'user',
                    }),
                },
            });
        case types.NAVIGATE_TO_CHANNEL:
            return Object.assign({}, state, {
                activeChannel: {
                    ...state.activeChannel,
                    channel: action.payload,
                },
            });
        case types.GET_CHANNEL_FAILURE:
            return Object.assign({}, state, {
                getChannel: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        case types.GET_CHANNEL_REQUEST:
            return Object.assign({}, state, {
                getChannel: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_CHANNEL_SUCCESS:
            return Object.assign({}, state, {
                getChannel: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                activeChannel: {
                    ...state.activeChannel,
                    channel: action.payload,
                },
            });
        default:
            return state;
    }
};
