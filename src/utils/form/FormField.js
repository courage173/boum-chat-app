import React from 'react';
import PropTypes from 'prop-types';
import './form.css';

function FormField({
    formdata,
    change,
    id,
    altStyle,
    styles,
    inputClass,
    // eslint-disable-next-line no-unused-vars
    Icon,
}) {
    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className="error-message">
                    {formdata.validationMessage}
                </div>
            );
        }

        return errorMessage;
    };

    const renderForm = () => {
        let template = null;
        switch (formdata.element) {
            case 'input':
                template = (
                    <>
                        <div className={`${altStyle} input-wrap`}>
                            {Icon && <Icon />}

                            <input
                                {...formdata.config}
                                value={formdata.value}
                                style={{
                                    boxShadow:
                                        '#3c393f 0px 0px 0px 9999px inset',
                                    ...styles,
                                }}
                                onBlur={event =>
                                    change({ event, id, blur: true })
                                }
                                onChange={event => change({ event, id })}
                                id={id}
                                className={`${inputClass} default-form`}
                            />
                        </div>
                        {showError()}
                    </>
                );
                break;
            case 'textArea':
                template = (
                    <>
                        <div className={`${altStyle} input-wrap`}>
                            <textarea
                                rows={5}
                                cols={5}
                                {...formdata.config}
                                value={formdata.value}
                                style={{
                                    boxShadow:
                                        '#3c393f 0px 0px 0px 9999px inset',
                                    ...styles,
                                }}
                                onBlur={event =>
                                    change({ event, id, blur: true })
                                }
                                onChange={event => change({ event, id })}
                                id={id}
                                className={`${inputClass} default-form-text-area `}
                            />
                        </div>
                        {showError()}
                    </>
                );
                break;
            default:
                template = <div></div>;
                break;
        }
        return template;
    };

    return <>{renderForm()}</>;
}

FormField.displayName = 'FormField';

FormField.propTypes = {
    formdata: PropTypes.shape({
        config: PropTypes.object,
        validation: PropTypes.object,
        valid: PropTypes.bool,
        validationMessage: PropTypes.string,
        element: PropTypes.string,
        value: PropTypes.string,
        showlabel: PropTypes.bool,
    }),
    Icon: PropTypes.element,
    change: PropTypes.func,
    id: PropTypes.string,
    altStyle: PropTypes.object,
    styles: PropTypes.object,
    inputClass: PropTypes.string,
    altFieldSet: PropTypes.string,
};
export default FormField;
