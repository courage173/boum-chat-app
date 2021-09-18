import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChatDashboard from '../../HOC/dashboard/ChatDashboard';
import './chat.css';
import ChatCard from './ChatCard';
import {
    update,
    generateData,
    isFormValid,
    resetFields,
} from '../../utils/form/formAction';
import FormField from '../../utils/form/FormField';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage } from '../../redux/actions/channel';

const Chat = ({ channel, sendMessage, requesting }) => {
    const messageRef = useRef(null);
    const scrollTobottom = () => {
        messageRef.current?.scrollIntoView({ behaviour: 'smooth' });
    };
    const messages = channel?.messages;
    useEffect(() => {
        scrollTobottom();
    }, [messages]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyBoard);

        return () => window.removeEventListener('keydown', handleKeyBoard);
    });
    const handleKeyBoard = e => {
        switch (e.key) {
            case 'Enter':
                return document.getElementById('submit-message').click();
            default:
                return false;
        }
    };
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
    const handleMessage = () => {
        const isValid = isFormValid(state.formdata);
        const channelId = channel?.channel?._id;
        if (isValid && channelId) {
            const data = generateData(state.formdata);
            sendMessage(channelId, data);
            const newField = resetFields(state.formdata);
            setState({ formdata: newField });
        }
    };

    const handleMessages = (messages = []) => {
        return (
            <>
                {messages.map(message => {
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
                                    {message.text}
                                </span>
                            </div>
                        );
                    } else {
                        return <ChatCard key={message._id} data={message} />;
                    }
                })}
                <div ref={messageRef}></div>
            </>
        );
    };
    return (
        <ChatDashboard>
            <div className="chat-container">
                <div className="chat-container-wrap">
                    {requesting ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <span>Loading</span>
                        </div>
                    ) : channel?.channel?.name ? (
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
                {channel?.channel?.name && (
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
                            <button onClick={handleMessage} id="submit-message">
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ChatDashboard>
    );
};

Chat.propTypes = {
    channel: PropTypes.object,
    sendMessage: PropTypes.func,
    requesting: PropTypes.bool,
};
const mapStateToProps = state => {
    return {
        user: state.user,
        channel: state.channel.activeChannel,
        requesting: state.channel.joinChannelRequest,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ sendMessage }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
