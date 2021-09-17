import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { update, generateData, isFormValid } from '../../utils/form/formAction';
import FormField from '../../utils/form/FormField';
import AuthLayout from '../../HOC/auth/AuthLayout';
import Button from '../../utils/button/Button';
import { history } from '../../redux/store';
import './auth.css';
import { loginUser } from '../../redux/actions/user';

const Login = ({ loginUser, requesting }) => {
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
    const handleLogin = () => {
        const valid = isFormValid(state.formdata);
        if (valid) {
            const formValues = generateData(state.formdata);
            loginUser(formValues).then(() => {
                history.push('/');
            });
        }
    };
    return (
        <AuthLayout>
            <div>
                <div className="auth-header">
                    <span>Welcome Back</span>
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
                            borderRadius: 0,
                            fontSize: 16,
                            fontweight: '600',
                            color: '#fff',
                        }}
                        title={requesting ? 'loading' : 'Sign in'}
                        runAction={handleLogin}
                    />
                </div>
                <div className="signup-wrap">
                    <span>Dont have an account?</span>{' '}
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            history.push('/register');
                        }}
                    >
                        {' '}
                        Sign up
                    </span>
                </div>
            </div>
        </AuthLayout>
    );
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    requesting: PropTypes.bool,
};
const mapStateToProps = state => {
    return {
        user: state.user,
        requesting: state.user.loginUser.requesting,
        loginUser: state.user.loginUser,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            loginUser,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
