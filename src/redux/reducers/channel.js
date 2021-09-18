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
    getMessage: {
        requesting: false,
        error: null,
        success: false,
    },
    getChannel: {
        requesting: false,
        error: null,
        success: false,
    },
    searchChannel: {
        requesting: false,
        error: null,
        success: false,
    },
    search: {
        channels: [],
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
                    channels: [action.payload, ...state.channels?.channels],
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
        case types.GET_CHANNEL_MESSAGES_REQUEST:
            return Object.assign({}, state, {
                getMessage: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_CHANNEL_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                getMessage: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                activeChannel: {
                    ...state.activeChannel,
                    messages: action.payload.messages,
                },
            });
        case types.ADD_MESSAGE_TO_STORE:
            return Object.assign({}, state, {
                activeChannel: {
                    ...state.activeChannel,
                    messages: state.activeChannel.messages.concat(
                        action.payload
                    ),
                },
            });
        case types.GET_CHANNEL_MESSAGES_FAILURE:
            return Object.assign({}, state, {
                getMessage: {
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
                    channel: action.payload.channel,
                    messages: [].concat({
                        ...action.payload.data,
                        type: 'user',
                    }),
                },
                joinChannelRequest: false,
            });
        case types.NAVIGATE_TO_CHANNEL:
            return Object.assign({}, state, {
                activeChannel: {
                    ...state.activeChannel,
                    channel: action.payload,
                    messages: [],
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
        case types.SEARCH_CHANNELS_REQUEST:
            return Object.assign({}, state, {
                searchChannel: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.SEARCH_CHANNELS_SUCCESS:
            return Object.assign({}, state, {
                searchChannel: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                search: action.payload,
            });
        case types.SEARCH_CHANNELS_FAILURE:
            return Object.assign({}, state, {
                searchChannel: {
                    requesting: true,
                    error: action.payload,
                    success: false,
                },
            });
        case types.RESET_SEARCH:
            return Object.assign({}, state, {
                search: {
                    channels: [],
                },
            });
        case types.JOIN_CHANNEL_RESET:
            return Object.assign({}, state, {
                joinChannelRequest: false,
            });
        default:
            return state;
    }
};
