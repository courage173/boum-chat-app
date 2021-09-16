import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { update } from '../../utils/form/formAction';
import FormField from '../../utils/form/FormField';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const DefaultSidebar = ({ handleClick }) => {
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
        setState({ loginErrorMessage: '', message: '' });
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
    const channels = [
        'Front End and to',
        'Random',
        'Back-end',
        'Cats troll Dog',
    ];
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
                <div className="plus-icon-container">
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
                {channels.map(channel => (
                    <div className="channel-list" key={channel}>
                        <div
                            className="channel-badge"
                            style={{ textTransform: 'capitalize' }}
                        >
                            <span>{getBadge(channel)}</span>
                        </div>
                        <div className="channel-name-text">
                            <span>{channel}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

DefaultSidebar.propTypes = {
    handleClick: PropTypes.func,
};
export default DefaultSidebar;
