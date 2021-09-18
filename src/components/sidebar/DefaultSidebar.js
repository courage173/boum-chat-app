import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { update } from '../../utils/form/formAction';
import FormField from '../../utils/form/FormField';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import {
    joinChannel,
    navigateToChannel,
    getChannelMessages,
    searchChannel,
    resetSearch,
} from '../../redux/actions/channel';

const DefaultSidebar = ({
    handleClick,
    toggleModal,
    channel,
    joinChannel,
    user,
    navigateToChannel,
    getChannelMessages,
    searchChannel,
    searchList,
    resetSearch,
}) => {
    const [state, setState] = useState({
        formdata: {
            search: {
                element: 'input',
                value: '',
                config: {
                    name: 'search_input',
                    type: 'text',
                    label: '',
                    placeholder: 'Search',
                },
                validation: {
                    required: false,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
        },
    });
    const updateForm = element => {
        const value = element.event.target.value;
        if (value.trim().length > 1) {
            searchChannel(value);
        } else {
            resetSearch();
        }

        const newFormdata = update(element, state.formdata, '');
        setState({
            formError: false,
            formdata: newFormdata,
        });
    };

    const getBadge = name => {
        const arr = name.split(' ');
        let text = '';
        if (arr.length > 1) {
            text = arr[0][0] + arr[1][0];
        } else {
            text = name[0];
        }
        return text.toUpperCase();
    };
    const handleJoin = (channelId, users, channel) => {
        const userId = user?.user._id;
        //check if user is already in channel
        const inChannel = users.some(user => user?.userId?._id === userId);
        if (inChannel) {
            navigateToChannel(channel);
            getChannelMessages(channelId);
        } else {
            joinChannel(channelId);
        }
        handleClick('channel');
    };
    const channelList =
        searchList.length > 0 ? searchList : channel?.channels?.channels || [];
    return (
        <div>
            <div className="top-navigation-wrap">
                <div>
                    <span
                        className="top-title"
                        onClick={() => handleClick('channel')}
                    >
                        Channels
                    </span>
                </div>
                <div
                    className="plus-icon-container"
                    onClick={() => toggleModal(true)}
                >
                    {' '}
                    <AddIcon />{' '}
                </div>
            </div>
            <div style={{ padding: '0 20px', marginTop: 20 }}>
                <FormField
                    id={'search'}
                    Icon={SearchIcon}
                    formdata={state.formdata.search}
                    change={element => updateForm(element)}
                    styles={{
                        color: '#fff',
                    }}
                />
            </div>
            <div style={{ marginTop: 30 }}>
                {channelList.map(channel => (
                    <div
                        className="channel-list"
                        key={channel._id}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            handleJoin(channel._id, channel.users, channel)
                        }
                    >
                        <div
                            className="channel-badge"
                            style={{ textTransform: 'capitalize' }}
                        >
                            <span>{getBadge(channel.name)}</span>
                        </div>
                        <div className="channel-name-text">
                            <span>{channel.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

DefaultSidebar.propTypes = {
    handleClick: PropTypes.func,
    toggleModal: PropTypes.func,
    channel: PropTypes.object,
    joinChannel: PropTypes.func,
    user: PropTypes.object,
    navigateToChannel: PropTypes.func,
    getChannelMessages: PropTypes.func,
    searchChannel: PropTypes.func,
    searchList: PropTypes.array,
    resetSearch: PropTypes.func,
};
const mapStateToProps = state => {
    return {
        user: state.user,
        requesting: state.channel.createChannel?.requesting,
        channel: state.channel,
        searchList: state.channel.search.channels,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            joinChannel,
            navigateToChannel,
            getChannelMessages,
            searchChannel,
            resetSearch,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(DefaultSidebar);
