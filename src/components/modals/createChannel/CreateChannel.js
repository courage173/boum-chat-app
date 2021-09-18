import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './createChannel.css';
import {
    update,
    generateData,
    isFormValid,
} from '../../../utils/form/formAction';
import FormField from '../../../utils/form/FormField';
import Button from '../../../utils/button/Button';
import {
    createChannel,
    joinChannel,
    JoinChannelReset,
} from '../../../redux/actions/channel';

const CreateChannelModal = ({
    toggleModal,
    createChannel,
    requesting,
    channel,
    joinChannel,
    JoinChannelReset,
}) => {
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
    const handleSubmit = () => {
        const valid = isFormValid(state.formdata);
        if (valid) {
            const data = generateData(state.formdata);
            createChannel(data).then(data => {
                const channelId = data.data?._id;
                joinChannel(channelId);
                toggleModal(false);
                JoinChannelReset();
            });
        }
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
                        title={requesting ? 'Loading' : 'Save'}
                        runAction={handleSubmit}
                        style={{
                            width: '80px',
                            height: '35px',
                        }}
                    />
                </div>
                <div style={{ color: 'red' }}>
                    <span>{channel.error}</span>
                </div>
            </div>
        </div>
    );
};

CreateChannelModal.propTypes = {
    toggleModal: PropTypes.func,
    createChannel: PropTypes.func,
    requesting: PropTypes.bool,
    channel: PropTypes.object,
    joinChannel: PropTypes.func,
    JoinChannelReset: PropTypes.func,
};
const mapStateToProps = state => {
    return {
        user: state.user,
        requesting: state.channel.createChannel?.requesting,
        channel: state.channel.createChannel,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { createChannel, joinChannel, JoinChannelReset },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelModal);
