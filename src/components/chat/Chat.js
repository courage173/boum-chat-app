import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChatDashboard from '../../HOC/dashboard/ChatDashboard';
import './chat.css';
import ChatCard from './ChatCard';
import { update } from '../../utils/form/formAction';
import FormField from '../../utils/form/FormField';
import SendIcon from '@mui/icons-material/Send';

const Chat = ({ channel }) => {
    const [state, setState] = useState({
        formdata: {
            message: {
                element: 'input',
                value: '',
                config: {
                    name: 'search_input',
                    type: 'text',
                    label: '',
                    placeholder: 'Type a message here',
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
        setState({ loginErrorMessage: '', message: '' });
        const newFormdata = update(element, state.formdata, '');
        setState({
            formError: false,
            formdata: newFormdata,
        });
    };
    const handleMessages = (messages = []) => {
        return messages.map(message => {
            if (message.type === 'user') {
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <span style={{ paddingTop: 10 }}>
                            Welcome {message.name}
                        </span>
                    </div>
                );
            } else if (message.type === 'user_joined') {
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <span style={{ paddingTop: 10 }}>
                            {message.name} Joine the chat
                        </span>
                    </div>
                );
            } else {
                return <ChatCard key={message._id} data={message} />;
            }
        });
    };
    return (
        <ChatDashboard>
            <div className="chat-container">
                <div style={{ marginTop: 50 }}>
                    {channel?.channel?.name ? (
                        channel?.messages?.length === 0 ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                }}
                            >
                                <span style={{ paddingTop: 10 }}>
                                    No messages yet
                                </span>
                            </div>
                        ) : (
                            handleMessages(channel?.messages)
                        )
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <span style={{ paddingTop: 10 }}>
                                Welcome, start chatting by joining a channel
                            </span>
                        </div>
                    )}
                </div>
                <div className="message-box-container">
                    <div className="message-box">
                        <FormField
                            id={'message'}
                            formdata={state.formdata.message}
                            change={element => updateForm(element)}
                            styles={{
                                color: '#fff',
                            }}
                            altStyle="message-text-wrap"
                        />
                        <button>
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        </ChatDashboard>
    );
};

Chat.propTypes = {
    channel: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        user: state.user,
        channel: state.channel.activeChannel,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
