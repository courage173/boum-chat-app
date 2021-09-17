import React, { useState } from 'react';
import ChatDashboard from '../../HOC/dashboard/ChatDashboard';
import './chat.css';
import ChatCard from './ChatCard';
import { update } from '../../utils/form/formAction';
import FormField from '../../utils/form/FormField';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
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
    return (
        <ChatDashboard>
            <div className="chat-container">
                <div style={{ marginTop: 50 }}>
                    {[1, 4].map(n => (
                        <ChatCard key={n} />
                    ))}
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

export default Chat;
