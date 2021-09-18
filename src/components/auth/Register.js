import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { update, isFormValid, generateData } from '../../utils/form/formAction';
import FormField from '../../utils/form/FormField';
import AuthLayout from '../../HOC/auth/AuthLayout';
import Button from '../../utils/button/Button';
import { history } from '../../redux/store';
import './auth.css';
import { registerUser } from '../../redux/actions/user';

const Register = ({ registerUser, requesting }) => {
    const [state, setState] = useState({
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'text',
                    label: '',
                    placeholder: 'Email',
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
            username: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    label: '',
                    placeholder: 'Username',
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
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    label: '',
                    placeholder: 'Name',
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
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    label: '',
                    placeholder: 'Password',
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
    const handleRegister = () => {
        const valid = isFormValid(state.formdata);
        if (valid) {
            const formValues = generateData(state.formdata);
            registerUser(formValues).then(() => {
                history.push('/');
            });
        }
    };
    return (
        <AuthLayout>
            <div>
                <div className="auth-header">
                    <span>Create Account</span>
                </div>
                <div style={{ margin: '20px 0' }}>
                    <div>
                        <span>Name</span>
                    </div>
                    <FormField
                        id={'name'}
                        formdata={state.formdata.name}
                        change={element => updateForm(element)}
                        styles={{
                            color: '#fff',
                        }}
                    />
                </div>
                <div style={{ margin: '20px 0' }}>
                    <div>
                        <span>Username</span>
                    </div>
                    <FormField
                        id={'username'}
                        formdata={state.formdata.username}
                        change={element => updateForm(element)}
                        styles={{
                            color: '#fff',
                        }}
                    />
                </div>
                <div style={{ margin: '20px 0' }}>
                    <div>
                        <span>Email</span>
                    </div>
                    <FormField
                        id={'email'}
                        formdata={state.formdata.email}
                        change={element => updateForm(element)}
                        styles={{
                            color: '#fff',
                        }}
                    />
                </div>
                <div style={{ margin: '20px 0' }}>
                    <div>
                        <span>Password</span>
                    </div>
                    <FormField
                        id={'password'}
                        formdata={state.formdata.password}
                        change={element => updateForm(element)}
                        styles={{
                            color: '#fff',
                        }}
                    />
                </div>
                <div>
                    <Button
                        style={{
                            width: '100%',
                            height: 40,
                            fontSize: 16,
                            fontweight: '600',
                            color: '#fff',
                            borderRadius: 7,
                        }}
                        title={requesting ? 'loading' : 'Sign up'}
                        runAction={handleRegister}
                    />
                </div>
                <div className="signup-wrap">
                    <span> have an account?</span>{' '}
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            history.push('/login');
                        }}
                    >
                        {' '}
                        Sign in
                    </span>
                </div>
            </div>
        </AuthLayout>
    );
};

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    requesting: PropTypes.bool,
};
const mapStateToProps = state => {
    return {
        user: state.user,
        requesting: state.user.registerUser.requesting,
        loginUser: state.user.registerUser,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            registerUser,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
