import React, { useState } from 'react';
import './createChannel.css';
import { update } from '../../../utils/form/formAction';
import FormField from '../../../utils/form/FormField';
import Button from '../../../utils/button/Button';
import PropTypes from 'prop-types';

const CreateChannelModal = ({ toggleModal }) => {
    const [state, setState] = useState({
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'search_input',
                    type: 'text',
                    label: '',
                    placeholder: 'Channel Name',
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
            description: {
                element: 'textArea',
                value: '',
                config: {
                    name: 'search_input',
                    type: 'text',
                    label: '',
                    placeholder: 'Channel Description',
                },
                validation: {
                    required: true,
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
        <div
            className="modal-wrapper"
            onClick={() => {
                toggleModal(false);
            }}
        >
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <div className="create-modal-title">
                    <span>New Channel</span>
                </div>
                <div>
                    <FormField
                        id={'name'}
                        formdata={state.formdata.name}
                        change={element => updateForm(element)}
                        styles={{
                            color: '#fff',
                        }}
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <FormField
                        id={'description'}
                        formdata={state.formdata.description}
                        change={element => updateForm(element)}
                        styles={{
                            color: '#fff',
                        }}
                    />
                </div>
                <div className="create-channel-btn-wrap">
                    <Button
                        title="Save"
                        runAction={() => {}}
                        style={{
                            width: '80px',
                            height: '35px',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

CreateChannelModal.propTypes = {
    toggleModal: PropTypes.func,
};
export default CreateChannelModal;
