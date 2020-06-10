import React from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends React.Component{

    renderError({ touched, error  }) {
        if (touched && error) {
            return (
                {touched} && {error} && <span>{error}</span>
            );
        }
    }

    renderInput = ({ input, label, type, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label> {label} </label>
                <input {...input} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }


    render() {
        
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui inverted form">
                <Field name="email" type="email" component={this.renderInput} label="Enter Login" />
                <Field name="password" type="password" component={this.renderInput} label="Enter Password" />
                <button disabled={this.props.buttonSubmit} className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors ={};
    if(!formValues.email) {
        errors.email = 'Required';
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,13}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address'
    }

    if(!formValues.password) {
        errors.password = 'Required';
    } 
    return errors;
};

export default reduxForm({
    form: 'userForm',
    validate
}) (Form);